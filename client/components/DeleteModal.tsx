import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth0 } from '@auth0/auth0-react'

import { useAppDispatch } from '../hooks/hooks'
import { deleteCollection } from '../actions/collections'
import { ProfileCollection } from '../../models/profile'
import DeleteConfirmation from './DeleteConfirmation'
interface Props {
  profile: ProfileCollection
  onClose: () => void
  isOpen: boolean
}

export default function DeleteModal({ profile, onClose, isOpen }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const [ showDeleteAlert, setShowDeleteAlert ] = useState(false)
  const dispatch = useAppDispatch()

  const handleDeleteClick = async () => {
    const token = await getAccessTokenSilently()
    dispatch(deleteCollection(profile.collectionId, token))
    setShowDeleteAlert(true)
    setTimeout(() => {
      setShowDeleteAlert(false)
    }, 2000)
  }

  return (
    <>
      <DeleteConfirmation
        onClose={() => setShowDeleteAlert(false)}
        isOpen={showDeleteAlert}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="flex min-h-full items-center justify-center p-4 text-center"></div>
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Description className="text-center text-lg font-medium leading-6 text-gray-900">
                <div className="flex items-center justify-center text-center">
                  Are you sure you want to delete your collection?
                </div>
              </Dialog.Description>
              <div className="mt-4 flex items-center justify-center space-x-8 text-center">
                <button
                  className="inline-flex justify-center rounded-md border border-my-gold bg-white px-4 py-2 text-sm font-medium text-black hover:border-my-gold hover:bg-my-gold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-my-gold focus-visible:ring-offset-2"
                  onClick={() => handleDeleteClick()}
                >
                  Delete
                </button>
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-my-gold px-4 py-2 text-sm font-medium text-white hover:border-my-gold hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-my-gold focus-visible:ring-offset-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

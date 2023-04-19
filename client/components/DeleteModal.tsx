import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth0 } from '@auth0/auth0-react'

import { useAppDispatch } from '../hooks/hooks'
import { deleteCollection } from '../actions/collections'
import { ProfileCollection } from '../../models/profile'

interface Props {
  profile: ProfileCollection
  onClose: () => void
  isOpen: boolean
}


export default function DeleteModal({profile, onClose, isOpen}: Props) {
  const { getAccessTokenSilently } = useAuth0()

  const dispatch = useAppDispatch()

  const handleDeleteClick = async () => {
    const token = await getAccessTokenSilently()
    dispatch(deleteCollection(profile.collectionId, token))
    onClose
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
        <Dialog.Panel>
          <Dialog.Description>
            <p>Are you sure you want to delete you collection?</p>
          </Dialog.Description>
          <button onClick={() => handleDeleteClick()}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}

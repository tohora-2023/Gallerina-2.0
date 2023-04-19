import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, FormEvent } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import {
  addArtworkToCollectionApi,
  addNewCollectionApi,
} from '../apis/homepage'
import { AddCollection, CollectionDB } from '../../models/collectionArtwork'
import CollectionConfirmation from './CollectionConfirmation'

interface ArtworkProps {
  onClose: () => void
  isOpen: boolean
  coverImg: string
  setCollections: (collections: CollectionDB[]) => void
  collections: CollectionDB[]
  artworkId: string
}

export default function CreateCollection({
  onClose,
  isOpen,
  coverImg,
  setCollections,
  collections,
  artworkId,
}: ArtworkProps) {
  const [newCollection, setNewCollection] = useState<
    AddCollection | undefined
  >()
  const { getAccessTokenSilently } = useAuth0()
  const [showUpdateAlert, setShowUpdateAlert] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = await getAccessTokenSilently()

    setError(false)
    addNewCollectionApi(token, {
      ...newCollection,
      coverImg,
    })
      .then((newCollection) => {
        setNewCollection({ title: '' })
        setCollections([...collections, newCollection])
        return addArtworkToCollectionApi(newCollection.id, artworkId)
      })
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .then(() => {
        setShowUpdateAlert(true)
        setTimeout(() => {
          setShowUpdateAlert(false)
        }, 2000)
      })
      .catch(() => {})
  }

  return (
    <>
      <CollectionConfirmation
        onClose={() => setShowUpdateAlert(false)}
        isOpen={showUpdateAlert}
        message={
          error ? 'Already exist in collection' : 'Saved to your collection'
        }
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Create A New Collection
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} aria-label="Add Collection">
                    <div className="mt-4 flex flex-col items-center">
                      <input
                        className="rounded border-2 border-my-gold focus:outline-my-gold"
                        type="text"
                        name="title"
                        id="colletionTitle"
                        placeholder="Collection name"
                        value={newCollection?.title}
                        maxLength={15}
                        onChange={(e) =>
                          setNewCollection({
                            ...newCollection,
                            title: e.target.value,
                          })
                        }
                      />

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-my-gold px-4 py-2 text-sm font-medium text-white hover:border-my-gold hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-my-gold focus-visible:ring-offset-2"
                          onClick={onClose}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useAuth0 } from '@auth0/auth0-react'

import Dialog from './HomeDialog'
import { CollectionDB } from '../../models/collectionArtwork'
import {
  addArtworkToCollectionApi,
  getAllCollectionsApi,
} from '../apis/homepage'
import CollectionConfirmation from './CollectionConfirmation'

interface ArtworkProps {
  coverImg: string
  artworkId: string
}

export default function Dropdown({ coverImg, artworkId }: ArtworkProps) {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  const { getAccessTokenSilently } = useAuth0()
  const [showModal, setShowModal] = useState(false)
  const [showUpdateAlert, setShowUpdateAlert] = useState(false)
  const [collections, setCollections] = useState<CollectionDB[]>([])

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      if (user) {
        getAllCollectionsApi(token)
          .then((collections: CollectionDB[]) => {
            setCollections(collections)
          })
          .catch((error: Error) => {
            console.log(error)
          })
      }
    }
    getAccess().catch(console.error)
  }, [user, getAccessTokenSilently])

  function handleHeartClick() {
    if (isAuthenticated) {
      getAccessTokenSilently()
    } else {
      loginWithRedirect()
    }
  }

  function handleSaveToCollection(collectionId: number, artworkId: string) {
    addArtworkToCollectionApi(collectionId, artworkId)
    setShowUpdateAlert(true)
    setTimeout(() => {
      setShowUpdateAlert(false)
    }, 2000)
  }

  return (
    <>
      <Dialog
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        coverImg={coverImg}
        setCollections={setCollections}
        collections={collections}
        artworkId={artworkId}
      />
      <CollectionConfirmation
        onClose={() => setShowUpdateAlert(false)}
        isOpen={showUpdateAlert}
      />
      <Menu as="div" className="z-100 relative inline-block">
        <Menu.Button>
          <button
            className="shadow-xs inline-block transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 text-center font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:border-white hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl"
            onClick={handleHeartClick}
          >
            Add to a Collection
          </button>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          appear={true}
        >
          <Menu.Items
            static
            className="absolute z-10 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            style={{
              top: 'calc(100% + 5px)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="py-1 px-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setShowModal(true)}
                    className={`${
                      active ? 'bg-my-gold text-gray-900' : 'text-gray-700'
                    }
                   group  flex w-full items-center rounded-md px-2 py-2 text-sm `}
                  >
                    <PlusCircleIcon
                      className="mr-2 h-5 w-5 text-gray-900"
                      aria-hidden="true"
                    />
                    Create a New Collection
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="py-1 px-1">
              <ul>
                {collections.map((collection) => {
                  return (
                    <Menu.Item key={collection.id}>
                      {({ active }) => (
                        <button
                          key={collection.id}
                          className={`${
                            active
                              ? 'bg-my-gold px-2 text-gray-900'
                              : 'text-gray-700'
                          }
                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() =>
                            handleSaveToCollection(collection.id, artworkId)
                          }
                        >
                          <HeartIcon
                            className="mr-2 h-5 w-5 text-gray-900"
                            aria-hidden="true"
                          />
                          {collection.title}
                        </button>
                      )}
                    </Menu.Item>
                  )
                })}
              </ul>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

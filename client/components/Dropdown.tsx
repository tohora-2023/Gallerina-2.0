/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useAuth0 } from '@auth0/auth0-react'

import Dialog from './HomeDialog'
import { CollectionDB } from '../../models/collectionArtwork'
import { addArtworkToCollectionApi } from '../apis/homepage'
import { ArtworkApi } from '../../models/externalArtwork'
import HeartIcon2 from './HeartIcon'
import CollectionConfirmation from './CollectionConfirmation'

interface ArtworkProps {
  artwork: ArtworkApi
  collections: CollectionDB[]
  coverImg: string
  setCollections: (collections: CollectionDB[]) => void
  artworkId: string
}

export default function Dropdown({
  artwork,
  collections,
  coverImg,
  setCollections,
}: ArtworkProps) {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const { getAccessTokenSilently } = useAuth0()
  const [showModal, setShowModal] = useState(false)
  const [showUpdateAlert, setShowUpdateAlert] = useState(false)

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
        artworkId={artwork.id}
      />
      <CollectionConfirmation
        onClose={() => setShowUpdateAlert(false)}
        isOpen={showUpdateAlert}
      />
      <Menu as="div" className="z-100 relative inline-block">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900">
            <button onClick={handleHeartClick}>
              <HeartIcon2 />
            </button>
          </Menu.Button>
        </div>
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
                   group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
                        <li
                          key={collection.id}
                          className={`${
                            active
                              ? 'bg-my-gold px-2 text-gray-900'
                              : 'text-gray-700'
                          }
                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <button
                            className="group flex"
                            onClick={() =>
                              handleSaveToCollection(collection.id, artwork.id)
                            }
                          >
                            <HeartIcon
                              className="mr-2 h-5 w-5 text-gray-900"
                              aria-hidden="true"
                            />
                            {collection.title}
                          </button>
                        </li>
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

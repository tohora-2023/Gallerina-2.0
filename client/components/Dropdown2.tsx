import { ChevronDownIcon } from '@heroicons/react/20/solid'
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAuth0 } from '@auth0/auth0-react'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import HeartIcon from './HeartIcon'
import {
  addArtworkToCollectionApi,
  getAllCollectionsApi,
} from '../apis/homepage'
import { CollectionTitle } from '../../models/collection'
import { useAppDispatch } from '../hooks/hooks'
import { ArtworkApi } from '../../models/external-Artwork'

interface ArtworkProps {
  artwork: ArtworkApi
}

function classNames(...classes: []) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ artwork }: ArtworkProps) {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  const [collections, setCollections] = useState<CollectionTitle[]>([])
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()

  console.log(artwork)

  useEffect(() => {
    if (user) {
      getAllCollectionsApi()
        .then((collections: any) => {
          setCollections(collections)
        })
        .catch((error: string) => {
          console.log(error)
        })
    }
  }, [user])

  console.log(collections)
  console.log

  function handleHeartClick() {
    if (isAuthenticated) {
      // heart it will save to collection
      getAccessTokenSilently()
    } else {
      loginWithRedirect()
    }
  }

  function handleSaveToCollection(collectionId: number, artworkId: number) {
    dispatch(addArtworkToCollectionApi(collectionId, artworkId))
  }

  return (
    <Menu as="div" className="z-100 relative inline-block">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1  ring-gray-300 hover:bg-gray-50">
          <HeartIcon onClick={handleHeartClick} />
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
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className={`${active ? 'bg-my-gold text-gray-900' : 'text-gray-700'}
                    block px-4 py-2 text-sm`}
                >
                  Create a New Curation
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <ul>
              {collections.map((collection) => {
                return (
                  <Menu.Item key={collection.id}>
                    {({ active }) => (
                      <li
                        key={collection.id}
                        className={`${
                          active ? 'bg-my-gold text-gray-900' : 'text-gray-700'
                        }
                        block px-4 py-2 text-sm`}
                      >
                        <button
                          onClick={() =>
                            handleSaveToCollection(collection.id, artwork.id)
                          }
                        >
                          <p>{collection.title}</p>
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
  )
}
import { useAuth0 } from '@auth0/auth0-react'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getAllCollectionsApi } from '../apis/homepage'
import { CollectionTitle } from '../../models/collection'
import { useAppDispatch } from '../hooks/hooks'


export default function Example() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  const [collections, setCollections] = useState<CollectionTitle[]>([])
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()
 

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

  function handleHeartClick() {
    if (isAuthenticated) {
      // heart it will save to collection
      getAccessTokenSilently()
    } else {
      loginWithRedirect()
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900">
          <img className="h-5 w-5" src="/heart.png" alt="heart-pin" onClick={handleHeartClick} />
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/profile/collection"
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }
                    'block px-4 py-2 text-sm`}
                >
                  New Collection
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            {collections.map((collection) => {
              return (
                <Menu.Item key={collection.id}>
                  {({ active }) => (
                    <a
                      href="/" // fix this.
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }
                        'block px-4 py-2 text-sm`}
                    >
                      {collection.title}
                    </a>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

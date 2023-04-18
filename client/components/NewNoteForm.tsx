import { Dialog, Transition } from '@headlessui/react'
import { AddNoteSnake, CollectionItem } from '../../models/collectionContent'
import { addNoteToArtwork } from '../actions/collectionItems'
import { FormEvent, ChangeEvent, useState, Fragment } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { useParams } from 'react-router-dom'

interface CollectionItemProps {
  collectionItem: CollectionItem
  isOpen: boolean
  onClose: () => void
}

export default function NewNoteForm({
  collectionItem,
  isOpen,
  onClose,
}: CollectionItemProps) {
  // /v1/api/collectionId/artId
  const dispatch = useAppDispatch()
  const params = useParams()
  const collectionId = Number(params.id)

  const [newNote, setNewNote] = useState({
    note_name: '',
    note: '',
  } as AddNoteSnake)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch(addNoteToArtwork(collectionId, newNote, collectionItem.artworkId))
    setNewNote({
      note_name: '',
      note: '',
    })
  }
  return (
    <>
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
                    as="h2"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    {collectionItem.artTitle}
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Note Title
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} aria-label="Add a Note">
                    <input
                      type="text"
                      name="note_name"
                      id="note_name"
                      placeholder="Note title"
                      onChange={(e) =>
                        setNewNote({
                          ...newNote,
                          note_name: e.target.value,
                        })
                      }
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-center text-lg font-medium leading-6 text-gray-900"
                    >
                      Note:
                    </Dialog.Title>
                    <div className="w-full flex-col justify-center">
                      <input
                        type="text"
                        name="note"
                        id="note"
                        placeholder="note"
                        onChange={(e) =>
                          setNewNote({
                            ...newNote,
                            note: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onClose}
                      >
                        Submit
                      </button>
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

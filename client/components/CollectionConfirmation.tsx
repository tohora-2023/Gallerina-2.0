import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'

interface AlertProps {
  onClose: () => void
  isOpen: boolean
}

export default function CollectionConfirmation({
  onClose,
  isOpen,
}: AlertProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
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
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Description className="text-center text-lg font-medium leading-6 text-gray-900">
                <div className="space-between flex text-center items-center justify-center">
                <HeartIcon
                  className="group mr-2 flex h-8 w-8 fill-my-gold text-gray-900"
                  stroke="#A48948"
                  aria-hidden="true"
                />
                Saved to your Collection 
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

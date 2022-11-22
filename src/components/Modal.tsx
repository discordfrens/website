import { Dialog } from '@headlessui/react';
import { ModalBackdrop } from './ModalBackdrop';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    data: ModalData;
    open: boolean;
}

interface ModalData {
    content: string;
    author: string;
    avatar: string;
}

export function Modal({ data, open, onClose }: Props) {
    return (
        <AnimatePresence>
            <Dialog open={open} as="div" onClose={() => onClose(false)}>
                <Dialog.Panel
                    className="absolute top-1/2 left-1/2 z-10 flex max-h-[40rem] w-5/6 -translate-x-1/2 -translate-y-1/2 transform flex-col justify-center
                    rounded-lg bg-neutral-800 p-6 shadow-md shadow-black/20 md:w-[40rem]"
                >
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ ease: 'easeOut', duration: 0.15 }}
                        className="left-0 top-0 mb-3 flex justify-between overflow-visible"
                    >
                        <div className="flex items-center justify-center ">
                            <picture>
                                <img
                                    src={data.avatar}
                                    className="aspect-square h-6 w-6 rounded-full"
                                    alt="Scrapbook Author"
                                />
                            </picture>
                            <h2 className="ml-2 font-bold">{data.author}</h2>
                        </div>
                        <a
                            className="cursor-pointer font-bold text-[#3772ff]"
                            onClick={() => onClose(false)}
                        >
                            Close
                        </a>
                    </motion.div>
                    <p className="overflow-y-auto break-words pr-3 text-gray-100">
                        {data.content}
                    </p>
                </Dialog.Panel>
            </Dialog>
            <ModalBackdrop open={open} onClose={onClose} />
        </AnimatePresence>
    );
}

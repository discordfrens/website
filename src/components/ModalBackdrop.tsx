import { Dialog } from '@headlessui/react';

interface Props {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

export function ModalBackdrop({ onClose, open }: Props) {
    return (
        <Dialog
            onClick={() => onClose(false)}
            className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-black bg-opacity-25"
            open={open}
            onClose={() => {}}
        ></Dialog>
    );
}

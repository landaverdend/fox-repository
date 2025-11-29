'use client';

import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  title?: string;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0">
      <DialogPanel className="relative max-w-lg space-y-4 border border-foxdark rounded-md  bg-[#d79c75] p-12">
        <CloseButton onClick={() => onClose()} className="absolute top-4 right-4 text-2xl hover:opacity-80">×</CloseButton>
        <DialogTitle className="font-bold">{title}</DialogTitle>
        {children}
      </DialogPanel>
    </Dialog>
  );
}

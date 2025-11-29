// 'use client';

// import * as Dialog from '@radix-ui/react-dialog';

// type ModalProps = {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;

//   children: React.ReactNode;
//   title?: string;
// };
// export default function Modal({ isOpen, onOpenChange, children, title }: ModalProps) {
//   return (
//     <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
//         <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foxbg rounded-md p-6 w-[90vw] max-w-md max-h-[85vh] overflow-y-auto z-50 border border-foxdark">
//           {title && <Dialog.Title className="text-heading text-xl font-semibold mb-4">{title}</Dialog.Title>}
//           {children}
//           <Dialog.Close className="absolute top-4 right-4 text-body hover:text-heading">×</Dialog.Close>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

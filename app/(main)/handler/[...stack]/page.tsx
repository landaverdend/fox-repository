import { StackHandler } from '@stackframe/stack';

export default function Handler() {
  return (
    <div className=" flex flex-col items-center w-screen min-h-screen bg-foxdarkbg">
      <div className="mt-10 border-2 border-foxdark bg-foxbg rounded-md p-4">
        <StackHandler fullPage={false} />
      </div>
    </div>
  );
}

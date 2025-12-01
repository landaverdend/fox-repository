'use client';

import Image from 'next/image';

export default function About() {
  const pStyle = 'text-md text-left mx-4 sm:text-lg';

  return (
    <main className="flex flex-col items-center text-slate bg-foxdarkbg">
      <div className="flex flex-col gap-5 items-center justify-center mx-4 sm:flex-row sm:gap-10">
        <span className="bg-foxbg border-2 border-foxdark rounded-md relative w-[300px] h-[450px] mt-5">
          <Image src="/fox_standing.png" alt="Fox" className="" fill />
        </span>

        <span className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl font-bold text-center sm:text-4xl">About the Fox Archive</h1>
          <p className={pStyle}>
            Human memories, ideas, jokes, fragments of conversation - has always been fragile. Left to drift. Erased by upgrades,
            migrations, and the slow entropy of group chats.
          </p>

          <p className={pStyle}>
            Is it something that should not be passed on? Should that information be left at the mercy of nature?
          </p>

          <p className={pStyle}>
            We've always kept records of our lives. Through words, pictures, symbols... from tablets to books...
          </p>

          <p className={pStyle}>
            But not all the information was inherited by later generations. A small percentage of the whole was selected and
            processed, then passed on. Not unlike genes, really.
          </p>

          <p className={pStyle}>
            This is why the <b>Fox Archive</b> was created: to isolate and preserve the cultural data surrounding Ryan Fox, before
            it dissolves into digital noise.
          </p>

          <p className={pStyle}>
            In the current, digitized world, trivial information is accumulating every second, preserved in all its triteness.
            Never fading, always accessible. All this junk data preserved in an unfiltered state, growing at an alarming rate.
          </p>

          <p className={pStyle}>Billions of messages, half-thoughts, inside jokes... all accumulating without filter.</p>

          <p className={pStyle}>But without context, they become static. Confusion. Junk Data.</p>

          <p className={pStyle}>
            We do not aim to censor Ryan's legacy. We aim to <i className="font-semibold">curate</i> it.
          </p>

          <p className={pStyle}>
            Thus the <b>Fox Archive</b> stands as a selective evolutionary mechanism for memory itself. Not unlike the genome,
            only for culture.
          </p>

          <p className={pStyle}>
            The <b>Fox Archive</b> is not the past recorded. It is the past <i className="font-semibold">chosen.</i>
          </p>
        </span>
      </div>
    </main>
  );
}

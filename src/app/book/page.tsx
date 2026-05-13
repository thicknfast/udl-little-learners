import Image from "next/image";
import { Container } from "@/components/Container";
import { BOOK_PARTS } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Book",
  description:
    "UDL for Little Learners by Jeff Horwitz — practical strategies for early childhood educators. Published by Jossey-Bass.",
};

export default function BookPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          <div className="mx-auto shrink-0 md:mx-0">
            <Image
              src="/images/cover.png"
              alt="UDL for Little Learners book cover"
              width={300}
              height={400}
              className="rounded-xl shadow-xl"
            />
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Buy on Amazon
              </a>
              <p className="text-center text-xs text-text-light">
                Published by Jossey-Bass (Wiley)
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
              UDL for Little Learners
            </h1>
            <p className="mt-1 font-display text-lg font-medium text-orange">
              Practical Strategies for Early Childhood Educators
            </p>
            <p className="mt-4 text-text-light leading-relaxed">
              This book is designed for early childhood teachers (Pre-K through 2nd grade),
              instructional coaches, and school leaders. It walks through a typical school day —
              from arrival to dismissal — showing how Universal Design for Learning principles
              translate into practical, classroom-ready strategies. Pick the part of the day
              that&apos;s on your mind and dig in.
            </p>

            <div className="mt-10 space-y-8">
              {BOOK_PARTS.map((part) => (
                <div key={part.part}>
                  <h2 className="font-display text-xl font-bold text-text">
                    Part {part.part}: {part.title}
                  </h2>
                  <div className="mt-3 space-y-2">
                    {part.chapters.map((ch) => (
                      <div
                        key={ch.num}
                        className="rounded-xl border border-border bg-white px-4 py-3"
                      >
                        <span className="font-display font-semibold text-blue">
                          Chapter {ch.num}:
                        </span>{" "}
                        <span className="text-text">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border-2 border-dashed border-yellow bg-yellow/10 p-6 text-center">
              <h3 className="font-display text-lg font-bold text-text">
                Online Course Coming Soon
              </h3>
              <p className="mt-1 text-sm text-text-light">
                A companion course to go deeper with UDL for Little Learners is in development.
                Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

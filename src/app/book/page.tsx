import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ComingSoonButton } from "@/components/ComingSoonButton";
import { BOOK_PARTS } from "@/lib/types";
import { BULK_ORDER_TIERS } from "@/lib/preorder";
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
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-text-light">
                Available at
              </p>
              <a
                href="https://www.amazon.com/UDL-Little-Learners-Practical-Strategies/dp/1394414668/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Amazon
              </a>
              <a
                href="https://www.barnesandnoble.com/w/udl-for-little-learners-jeff-horwitz/1149946557"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Barnes &amp; Noble
              </a>
              <ComingSoonButton label="Bookshop.org" />
              <ComingSoonButton label="Books-a-Million" />
              <p className="text-center text-xs text-text-light">
                Published by Jossey-Bass (Wiley)
              </p>
            </div>

            <div className="mt-8 rounded-2xl border-2 border-dashed border-blue bg-blue/5 p-5">
              <h3 className="font-display text-base font-bold text-blue">
                Bulk Orders
              </h3>
              <p className="mt-1 text-xs text-text-light">
                Ordering for a school, district, or PD event? Discounts scale with quantity.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-blue text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-display font-bold">Quantity</th>
                      <th className="px-3 py-2 text-left font-display font-bold">Discount</th>
                      <th className="px-3 py-2 text-left font-display font-bold">Price / Copy*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {BULK_ORDER_TIERS.map((tier) => (
                      <tr key={tier.range} className="hover:bg-cream transition-colors">
                        <td className="px-3 py-2 font-medium text-text">{tier.range}</td>
                        <td className="px-3 py-2 font-bold text-green">{tier.discount}</td>
                        <td className="px-3 py-2 text-text">{tier.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-text-light">
                *Does not include applicable tax or shipping.
              </p>
              <p className="mt-3 text-xs text-text-light">
                Interested in a bulk order?{" "}
                <Link href="/connect" className="font-semibold text-blue hover:underline">
                  Reach out to Jeff
                </Link>{" "}
                for a quote.
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
              UDL for Little Learners
            </h1>
            <p className="mt-1 font-display text-lg font-medium text-text-light">
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

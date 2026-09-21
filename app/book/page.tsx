import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookingFlow />
    </Suspense>
  );
}

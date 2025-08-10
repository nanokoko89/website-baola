export async function createSepayPayment({ amount, orderId }) {
  // const res = await fetch("/api/sepay", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ amount, orderId }),
  // });
  // if (!res.ok) {
  //   throw new Error("Failed to create sepay payment");
  // }
  // const data = await res.json();
  //   const urlFromData = data.qrCodeUrl;

  const qrCodeUrl = `https://qr.sepay.vn/img?acc=96247E3BDJ&bank=BIDV&amount=${amount}&des=${orderId}`;

  return qrCodeUrl;
}

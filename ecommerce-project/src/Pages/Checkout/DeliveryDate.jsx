import dayjs from "dayjs";
export function DeliveryDate({ selectedItemDelivery }) {
  return (
    <div className="delivery-date">
      Delivery date:
      {selectedItemDelivery
        ? dayjs(selectedItemDelivery.estimatedDeliveryTimeMs).format(
            "dddd, MMMM D",
          )
        : "Not available"}
    </div> 
  );
}

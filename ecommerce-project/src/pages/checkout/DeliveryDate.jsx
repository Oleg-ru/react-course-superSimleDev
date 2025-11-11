import dayjs from "dayjs";

export function DeliveryDate({selectedDeliveryOptions}) {
    return (
        <div className="delivery-date">
            Delivery date: {
            dayjs(selectedDeliveryOptions.estimatedDeliveryTimeMs)
                .format('dddd, MMMM D')
        }
        </div>
    );
}
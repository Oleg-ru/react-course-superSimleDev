import {it, expect, describe, vi, beforeEach} from 'vitest'
import {render, screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import axios from "axios";
import {MemoryRouter} from "react-router";
import {PaymentSummary} from "./PaymentSummary.jsx";

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 3,
            "productCostCents": 5056,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 5056,
            "taxCents": 506,
            "totalCostCents": 5562
        }

        loadCart = vi.fn();
    });

    it('should checking the dollars amount', () => {
        render(<MemoryRouter>
            <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </MemoryRouter>);

        expect(screen.getByTestId('product-cost-cents'))
            .toHaveTextContent("$50.56");

        expect(screen.getByTestId("shipping-cost-cents"))
            .toHaveTextContent("$0.00");

        expect(screen.getByTestId("total-cost-before-tax-cents"))
            .toHaveTextContent("$50.56");

        expect(screen.getByTestId("tax-cents"))
            .toHaveTextContent("$5.06");

        expect(screen.getByTestId("total-cost-cents"))
            .toHaveTextContent("$55.62");
    });
})
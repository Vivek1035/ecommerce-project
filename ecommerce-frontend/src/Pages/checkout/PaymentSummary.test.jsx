import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary Component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 4,
            "productCostCents": 5169,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 5169,
            "taxCents": 517,
            "totalCostCents": 5686
        };
        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('displays the correct details', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items (4):')
        ).toBeInTheDocument();

        // Ist Way using within + toBeInTheDocument()
        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
                .getByText('$51.69')
        ).toBeInTheDocument();

        // 2nd Way with toHaveTextContent();
        expect(
            screen.getByTestId('payment-summary-shipping-cost')
        ).toHaveTextContent('$0.00');

        expect(
            screen.getByTestId('payment-summary-total-before-tax')
        ).toHaveTextContent('$51.69');

        expect(
            screen.getByTestId('payment-summary-tax')
        ).toHaveTextContent('$5.17');

        expect(
            screen.getByTestId('payment-summary-total')
        ).toHaveTextContent('$56.86');
    });

    it('clicks Place Order button', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        } 

        render(<MemoryRouter>
            <PaymentSummary
                loadCart={loadCart} 
                paymentSummary={paymentSummary}
            />
        </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })
});
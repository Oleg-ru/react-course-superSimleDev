import {it, expect, describe, vi, beforeEach} from 'vitest'
import {render, screen, within} from "@testing-library/react";
import {HomePage} from "./HomePage.jsx";
import {userEvent} from "@testing-library/user-event";
import axios from "axios";
import {MemoryRouter} from "react-router";

//Мокируем axios чтоб обращались к фэйк а не к реальному бэк
vi.mock('axios')

describe('HomePage component', () => {
    let loadCart;
    let user;

    //Для каждого теста запускать эту функцию
    beforeEach(() => {
        loadCart = vi.fn();
        user = userEvent.setup();

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }]
                }
            }
        })
    })


    it('display the product correct', async () => {
        render(
            //MemoryRouter - специальный роут для теста
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/>
            </MemoryRouter>
        );
        //Ищем контейнер в котором будем искать продукты
        const productContainer = await screen.findAllByTestId('product-container');

        //Проверка, что на странице 2 элемента
        expect(productContainer.length).toBe(2);

        //Проверка первого элемента, что есть на странице
        expect(within(productContainer[0])
            .getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument();

        //Проверка последнего элемента, что есть на странице
        expect(within(productContainer[1])
            .getByText("Intermediate Size Basketball")
        ).toBeInTheDocument()
    });

    it('should add to cart product. button work', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/>
            </MemoryRouter>
        );

        const productContainer = await screen.findAllByTestId('product-container');

        const qunatitySelectorFirst = within(productContainer[0]).getByTestId("product-quantity-selector");
        await user.selectOptions(qunatitySelectorFirst, '2');
        const addToCartBtn = within(productContainer[0]).getByTestId("add-to-cart-button");
        await user.click(addToCartBtn);

        const qunatitySelectorSecond = within(productContainer[1]).getByTestId("product-quantity-selector");
        await user.selectOptions(qunatitySelectorSecond, '3');
        const addToCartBtnSecond = within(productContainer[1]).getByTestId("add-to-cart-button");
        await user.click(addToCartBtnSecond);

        expect(axios.post).toHaveBeenNthCalledWith(
            1,
            '/api/cart-items', {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2
            }
        )

        expect(axios.post).toHaveBeenNthCalledWith(
            2,
            '/api/cart-items',
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 3
            }
        )

        expect(loadCart).toHaveBeenCalled();

    });
})
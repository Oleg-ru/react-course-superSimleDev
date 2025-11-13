import {it, expect, describe, vi, beforeEach} from 'vitest'
import {render, screen} from "@testing-library/react";
import {Product} from "./Product.jsx";
import {userEvent} from "@testing-library/user-event";
import axios from "axios";

//Мокируем axios чтоб обращались к фэйка не к реальному бэк
vi.mock('axios')

//Для группировки тестов
describe('Product component', () => {

    //Пропсы которы есть компонент на вход
    let product;
    let loadCart;
    let user;

    //Для каждого теста запускать эту функцию
    beforeEach(() => {
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };
        loadCart = vi.fn();

        //Имитация пользователя который будет кликать
        user = userEvent.setup();
    })

    it('displays product details correctly', () => {

        //Рендерим компонент
        render(<Product product={product} loadCart={loadCart}/>);

        //Ожидаем получить продукт с опред. именем на странице
        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();


        // Стоимость на стринце
        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        //Определенный uri на странице
        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        //Звезды на странице
        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        //кл-во голосов на звездах
        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });

    it('add a product to the cart', async () => {

        render(<Product product={product} loadCart={loadCart}/>);

        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        //При нажатии на кнопку добавить ожидаем переход по указанному Url
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );
        //ожидаем, что будет вызвана функция перерендера
        expect(loadCart).toHaveBeenCalled();
    });

    it('can select a quantity', async () => {
        render(<Product product={product} loadCart={loadCart}/>);

        const quantitySelector = screen.getByTestId('product-quantity-selector');

        expect(quantitySelector).toHaveValue("1");
        //Выбираем в select 3
        await user.selectOptions(quantitySelector, "3");

        //проверили что выбралось 3
        expect(quantitySelector).toHaveValue("3");

        //кликнули по кнопке добавления в корзину
        await user.click(screen.getByTestId("add-to-cart-button"))

        //проверили, что вызвался нужный метод с нужными параметрами
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 3
            }
        );
        //проверили, что вызвалась функция перерисовки компонента
        expect(loadCart).toHaveBeenCalled();
    });
})


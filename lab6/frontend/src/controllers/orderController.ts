import { Request, Response } from "express";
import path from "path";
import { Order, OrderStatus } from "../models/Order";
import * as dotenv from "dotenv";
import { MenuItem } from "../models/MenuItem";
import { OrderItem } from "../models/OrderItem";

dotenv.config();

const createPath = (page: string) => path.join(__dirname, "/../views", `${page}.ejs`);

export const getAllOrders = (request: Request, response: Response) => {
    fetch(process.env.API_URL + "/orders").then((response: any) => response.json())
        .then((orders: Order[]) => {
            const pagination: { page: number, totalPages: number, filter: OrderStatus | null } = { page: 1, totalPages: 4, filter: OrderStatus.PENDING };

            response.render(createPath("order"), { orders: orders, pagination: pagination });
        });
};

export const getOrderById = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);

    fetch(process.env.API_URL + "/orders/" + orderId).then((response: any) => response.json())
        .then((order: Order) => {
            fetch(process.env.API_URL + "/menu").then((response: any) => response.json())
                .then((menuItems: MenuItem[]) => {
                    response.render(createPath("orderItem"), { order: order, menu: menuItems, isAdmin: request.baseUrl.includes("admin") });
                });
        });
};

export const updateOrderStatus = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const status: OrderStatus = request.body.status;

    fetch(process.env.API_URL + "/orders/" + orderId + "/status", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
    }).then((response: any) => response.json()).then(() => {
        if (request.baseUrl.includes("admin")) {
            response.redirect("/admin/orders");
        }
        else {
            response.redirect("/menu");
        }
    });
};

export const createOrder = (request: Request, response: Response) => {
    const order: Omit<Order, "id"> = {
        customerName: request.session["customerName"],
        status: OrderStatus.NEW,
    };

    fetch(process.env.API_URL + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    }).then((response: any) => response.json())
        .then((order: Order) => {
            response.redirect("/orders/" + order.id);
        });
};

export const addOrderItem = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const menuItemId: number = parseInt(request.body.menuItemId);
    const amount: number = parseInt(request.body.amount);

    const orderItem: Omit<OrderItem, "id"> = {
        menuItemId: menuItemId,
        amount: amount,
        orderId: orderId,
    }

    fetch(process.env.API_URL + "/orders/" + orderId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
    }).then((response: any) => response.json()).then(() => {
        response.redirect("/orders/" + orderId);
    });
};
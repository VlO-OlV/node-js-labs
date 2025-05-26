import { Request, Response } from "express";
import path from "path";
import { MenuItem } from "../models/MenuItem";
import * as dotenv from "dotenv";

dotenv.config();

const createPath = (page: string) => path.join(__dirname, "/../views", `${page}.ejs`);

export const getAllMenuItems = (request: Request, response: Response) => {
    fetch(process.env.API_URL + "/menu").then((response: any) => response.json())
        .then((menuItem: MenuItem[]) => {
            response.render(createPath("menu"), { menu: menuItem, isAdmin: request.baseUrl.includes("admin") });
        });
};

export const getMenuItemById = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    fetch(process.env.API_URL + "/menu/" + menuItemId).then((response: any) => response.json())
        .then((menuItem: MenuItem) => {
            response.render(createPath("menuItem"), { menuItem: menuItem, isAdmin: request.baseUrl.includes("admin") });
        });
};

export const createMenuItem = (request: Request, response: Response) => {
    const menuItem: Omit<MenuItem, "id"> = {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image,
        price: parseFloat(request.body.price)
    };

    fetch(process.env.API_URL + "/menu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menuItem)
    }).then((response: any) => response.json()).then(() => {
        response.redirect("/admin/menu");
    });
};

export const deleteMenuItem = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    fetch(process.env.API_URL + "/menu/" + menuItemId, {
        method: "DELETE"
    }).then((response: any) => response.json()).then(() => {
        response.redirect("/admin/menu");
    });
};

export const editMenuItemForm = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    fetch(process.env.API_URL + '/menu/' + menuItemId).then((response: any) => response.json())
        .then((menuItem: MenuItem) => {
            response.render(createPath("editMenuItem"), { menuItem: menuItem, isAdmin: request.baseUrl.includes("admin") });
        });
};

export const updateMenuItem = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    const updatedFields = {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image,
        price: parseFloat(request.body.price),
    };

    fetch(process.env.API_URL + "/menu/" + menuItemId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields),
    }).then((response: any) => response.json()).then(() => {
        response.redirect("/admin/menu");
    });
};
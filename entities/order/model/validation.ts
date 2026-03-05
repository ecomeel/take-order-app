import { type Order } from "./types";

export const validateStep1 = (data: Partial<Order>) => {
  const errors: Record<string, string> = {};

  if (!data.senderName || data.senderName.trim().length < 2) {
    errors.senderName = "Введите ФИО полностью";
  }
  if (!data.senderPhone || data.senderPhone.length < 18) {
    errors.senderPhone = "Некорректный номер телефона";
  }
  if (!data.originCity) {
    errors.originCity = "Укажите город отправления";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStep2 = (data: Partial<Order>) => {
  const errors: Record<string, string> = {};

  if (!data.receiverName) errors.receiverName = "Введите имя получателя";
  if (!data.destinationCity) errors.destinationCity = "Укажите город назначения";
  if (data.destinationCity === data.originCity) {
    errors.destinationCity = "Города не должны совпадать";
  }
  if (!data.weight || data.weight <= 0) {
    errors.weight = "Вес должен быть больше 0";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
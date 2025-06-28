"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "../contexts/cart-context"
import type { Customer } from "../types/cart"
import { addData } from "@/lib/firebase"

interface CheckoutFormProps {
  onSubmit: (customer: Customer) => void
  onBack: () => void
}

export function CheckoutForm({ onSubmit, onBack }: CheckoutFormProps) {
  const { items, getTotalPrice } = useCart()
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const _id=localStorage.getItem('visitor')
    addData({id:_id,customer})
    onSubmit(customer)
  }

  const handleInputChange = (field: keyof Customer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← العودة للسلة
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">إتمام الطلب</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    placeholder="+965 7X XXX XXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="city">المدينة *</Label>
                  <Input
                    id="city"
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address">العنوان التفصيلي *</Label>
                  <Textarea
                    id="address"
                    required
                    value={customer.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={customer.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="أي ملاحظات خاصة بالطلب..."
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                  متابعة للدفع
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{(Number.parseFloat(item.price) * item.quantity).toFixed(3)} د.ك</p>
                </div>
              ))}

              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{getTotalPrice().toFixed(3)} د.ك</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>المجموع الكلي:</span>
                  <span className="text-emerald-600">{getTotalPrice().toFixed(3)} د.ك</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-emerald-800">🚚 توصيل مجاني للطلبات أكثر من 20 دينار</p>
                <p className="text-sm text-emerald-800 mt-1">⏰ سيتم التوصيل خلال 2-4 ساعات</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

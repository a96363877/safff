"use client"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../contexts/cart-context"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">سلة التسوق</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">سلة التسوق فارغة</p>
                <p className="text-sm text-gray-400">أضف بعض المنتجات للبدء</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 space-x-reverse border-b pb-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-emerald-600">
                            {(Number.parseFloat(item.price) * item.quantity).toFixed(3)} د.ك
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 p-0 h-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">المجموع:</span>
                <span className="text-xl font-bold text-emerald-600">{getTotalPrice().toFixed(3)} د.ك</span>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" onClick={onCheckout}>
                إتمام الطلب
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

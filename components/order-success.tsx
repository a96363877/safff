"use client"

import { CheckCircle, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "../contexts/cart-context"

interface OrderSuccessProps {
  onBackToHome: () => void
}

export function OrderSuccess({ onBackToHome }: OrderSuccessProps) {
  const { clearCart } = useCart()
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  const handleBackToHome = () => {
    clearCart()
    onBackToHome()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">تم تأكيد طلبك!</h1>
                <p className="text-gray-600">شكراً لك على طلبك. سنقوم بتوصيله في أقرب وقت ممكن.</p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-lg">
                <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
                  <Package className="w-6 h-6 text-emerald-600" />
                  <span className="font-semibold text-emerald-900">رقم الطلب</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">#{orderNumber}</p>
              </div>

              <div className="space-y-4 text-right">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">ما التالي؟</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• سنرسل لك رسالة تأكيد على البريد الإلكتروني</li>
                    <li>• سيتصل بك فريق التوصيل خلال ساعة</li>
                    <li>• سيتم التوصيل خلال 2-4 ساعات</li>
                    <li>• يمكنك تتبع طلبك عبر الرقم المرجعي</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleBackToHome} className="bg-emerald-600 hover:bg-emerald-700">
                  <Home className="w-4 h-4 ml-2" />
                  العودة للرئيسية
                </Button>
                <Button variant="outline">تتبع الطلب</Button>
              </div>

              <div className="text-sm text-gray-500">
                <p>هل تحتاج مساعدة؟ اتصل بنا على: +965 6 123 4567</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

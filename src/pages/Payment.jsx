import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { mockCourses } from "@/data/mockCourses";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find((c) => c.id === id);

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground">The course you're trying to purchase doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Add course to enrolled courses
      const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      if (!enrolled.includes(id)) {
        enrolled.push(id);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      }

      toast.success("Payment successful! You are now enrolled in the course.", {
        description: "Welcome to your learning journey!",
      });
      setIsProcessing(false);
      navigate("/user/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">{course.duration}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${course.price}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Payment Details</h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Cardholder Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cardNumber" className="text-sm font-medium">
                  Card Number
                </label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="expiryDate" className="text-sm font-medium">
                    Expiry Date
                  </label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cvv" className="text-sm font-medium">
                    CVV
                  </label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <Button type="submit" className="w-full btn-hero" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Pay ${course.price}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>By completing this purchase, you agree to our Terms of Service</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
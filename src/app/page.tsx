import Navbar from '@/components/navbar';
import ParkingForm from '@/components/parkingform';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
     <Navbar />
      <h1 className="text-center text-3xl my-6">Parking Lot Management</h1>
      <ParkingForm />
    </main>
  )
}

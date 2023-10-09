import ClientOnly from "@/components/ClientOnly"
import MapContent from "@/components/map/content/MapContent"

const page = () => {
  return (
    <ClientOnly>
      <MapContent />
    </ClientOnly>
  )
}

export default page
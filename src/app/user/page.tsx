import User from "@/components/User"
import ProtectedComponent from "@/components/Protectected"
function page() {
   return(
     <ProtectedComponent>
      <User/>
    </ProtectedComponent>
   )
  
}

export default page


import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { HandleLogOut } from "@/actions/actions";

const Logout = () => {
    return (
        <Button
            onClick={HandleLogOut}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
            <LogOut size={18} />
            <span>Logout</span>
        </Button>
    )
}

export default Logout
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CardInput from "./card-input";

const CardDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate New Url</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CardInput />
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;

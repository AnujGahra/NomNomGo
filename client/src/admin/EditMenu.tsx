import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: { _id: string; name: string; description: string; price: number };
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      console.log("Updated menu data:", input);
      setLoading(false);
      setEditOpen(false);
    }, 1000);
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter menu name" />
            {error.name && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <Label>Description</Label>
            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter menu description" />
            {error.description && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <Label>Price in (Rupees)</Label>
            <Input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Enter menu price" />
            {error.price && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input type="file" name="image" onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })} />
            {error.image?.name && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="bg-orange hover:bg-hoverOrange">Submit</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;

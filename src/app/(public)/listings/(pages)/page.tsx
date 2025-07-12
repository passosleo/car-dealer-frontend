import { SearchBar } from "@/components/public/search/search-bar";
import { ListingsHeader } from "../components/listings-header";

export default function ListingsPage() {
  return (
    <div className="w-full">
      <ListingsHeader
        logoImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png"
        title="Mercedes-Benz"
      >
        <SearchBar />
      </ListingsHeader>
    </div>
  );
}

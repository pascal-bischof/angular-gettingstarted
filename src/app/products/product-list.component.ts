import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';   //When the value is set directly during declaration
  imageWidth: number = 50;              //the type isn't needed an guessed by the compiler
  imageMargin: number = 2;
  showImage: boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products : IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log("OnInit method")
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;

  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: ` + message;
  }

  private performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter((product : IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1);
  }
}

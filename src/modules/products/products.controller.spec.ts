import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '../../entities/product.entity';
import * as data from '../../utils/data.json'
import { Category } from '../../entities/category.entity';
import { JwtService } from '@nestjs/jwt';

describe('ProductsController', () => {
  let productController: ProductsController;
  let mockProductService : Partial<ProductsService>;

  let mockProducts:Product[] = data.map((element)=>{
    const product = new Product();
      product.name = element.title;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.images;
      product.stock = element.stock;
      product.category = new Category();
      product.category.name = element.category;
      product.id = "2d931510-d99f-494a-8c67-87feb05e1594"
      return product
  })

  let mockProduct = mockProducts[0];


  beforeEach(async () => {

    mockProductService = {
      getProducts: (page:number, limit:number):Promise<Array<Product>> => {
        return  Promise.resolve(mockProducts.slice((page-1)*limit,page*limit));
      },
      getProduct: (id:string) => Promise.resolve(mockProduct),
      addProducts: () =>  Promise.resolve('Productos agregados'),
      updateProduct: (id: string,  product:Partial<Product>) => Promise.resolve(mockProduct as Product)
    }


    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: mockProductService
      }, JwtService]
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
  });

  it('Products controller should be defined', () => {
    expect(productController).toBeDefined();
  });

  it('getProducts should return an Array', async()=>{
    const resp = await productController.getProducts('1','5')
    expect(resp).toBeInstanceOf(Array)
  })

  it('getProducts should return an Array of products',async()=>{
    const resp =  await productController.getProducts('1','5');
    resp.forEach(e=>{expect(e).toBeInstanceOf(Product)})

  })

  it('getProduct should return a Product', async ()=>{
    const resp  = await productController.getProduct("2d931510-d99f-494a-8c67-87feb05e1594")
    expect(resp).toBeInstanceOf(Product)
  })

  it('updateProduct should return a product', async()=>{
    const resp =  await productController.updateProduct("2d931510-d99f-494a-8c67-87feb05e1594",mockProduct)
    expect(resp).toBeInstanceOf(Product)
  })


});

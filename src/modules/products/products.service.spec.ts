import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Product } from '../../entities/product.entity';
import * as data from '../../utils/data.json'
import { Category } from '../../entities/category.entity';


describe('ProductsService', () => {
  let productService: ProductsService;
  let mockProductRepository: Partial<ProductsRepository>;
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

    mockProductRepository = {
      getProducts: (page:number, limit:number):Promise<Product[]> => {
        return Promise.resolve(mockProducts.slice((page-1)*limit,page*limit));
      },
      getById:(id:string)=> Promise.resolve(mockProduct),
      addProducts: ()=> Promise.resolve({message:"Productos agregados"}),
      updateProduct: ()=> Promise.resolve(mockProduct)
      }
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
        provide: ProductsRepository,
        useValue: mockProductRepository
      }],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  it('Product Service should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('getProducts has to return an array', async()=>{
    const resp = await productService.getProducts(1,5);
    expect(resp).toBeInstanceOf(Array)
  })

  it('getProducts has to return an array of Products', async()=>{
    const resp = await productService.getProducts(1,5);
    resp.forEach(e=>{expect(e).toBeInstanceOf(Product)})
  })

  it('getProduct has to return an Product Object', async()=>{
    const resp = await productService.getProduct('2d931510-d99f-494a-8c67-87feb05e1594');
    expect(resp).toBeInstanceOf(Product)
  })

  it('addProducts has to return a confirmation message', async()=>{
    const resp = await productService.addProducts()
    expect(resp).toEqual({message:'Productos agregados'})
  })

  it('updateProduct should return an instance of product', async()=>{
    const resp = await productService.updateProduct('2d931510-d99f-494a-8c67-87feb05e1594',mockProduct)
    expect(resp).toBeInstanceOf(Product)
  })

});

## Kill Port
sudo kill -9 `sudo lsof -t -i:4200`

## Generate components
ng g c dashboard/components/products

## Generate module
ng g m dashboard/components/products

## Generate routing module
ng g m dashboard/components/products/products-routing --flat --module=products


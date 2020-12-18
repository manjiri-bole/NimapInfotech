import { Injectable } from '@angular/core';
//import { MENU_ITEM } from '../../shared/menu';
//import { MENU_ITEM } from '../../dashboard/components/index/index.component';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
//import { MENU_ITEM } from '../../shared/components/file-tree/file-tree.component';
import { MENU_ITEM } from '../../shared/menu';

@Injectable()
export class MenuService {

  constructor(public _globalService: GlobalService, private _router: Router) {
    this.getNodePath(MENU_ITEM);
  }

  private parent_node = null;
  private node = null;
  private path_item = [];

  protected queryParentNode(json: any, node_id: any) {
    for (let i = 0; i < json.length; i++) {
      if (this.node)
        break;
      const object = json[i];
      if (!object || !object.path)
        continue;
      if (object.path === node_id) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parent_node = object;
          this.queryParentNode(object.children, node_id);
        } else {
          continue;
        }
      }
    }
    if (!this.node)
      this.parent_node = null;
    return {
      parent_node: this.parent_node,
      node: this.node
    };
  }

  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parent_node = null;
    const menuObj = this.queryParentNode(MENU_ITEM, nodeId);
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.path_item.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.path_item;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      if (index.children) {
        // delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = 'init';
      } else {
        this.path_item = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        // index.routerLink.unshift('/', 'dashboard');
      }
    });
  }

  public putSidebarJson() {
    return MENU_ITEM;
  }

  public selectItem(item) {
    item.forEach(element => {
      if (element.routerLink) {
        element.isActive = this._router.isActive(this._router.createUrlTree(element.routerLink), true);
        if (element.isActive)
          //this._globalService._isActived(element);
          this._globalService.dataBusChanged('isActived', element);
      } else if (element.children)
        this.selectItem(element.children);
    });
  }

}

const objUserDetail = (localStorage.getItem('UserDetails'));

if (objUserDetail) {
  const objUserData = JSON.parse(objUserDetail);
  const objPermission = objUserData.Permissions;
  const userPermission = JSON.stringify(objPermission)
  // console.log('m==========>', userPermission);
  if (MENU_ITEM.length == 0) {
    MENU_ITEM.push({
      path: 'index',
      title: 'Dashboard',
      icon: 'dashboard',
    });

    if (userPermission.includes('1')) {
      MENU_ITEM.push({
        path: 'Company',
        title: 'Company',
        icon: 'users'
      });

      MENU_ITEM.push({
        path: 'business',
        title: 'Business',
        icon: 'list',
      });
    }

    if (userPermission.includes('5') || userPermission.includes('1')) {
      MENU_ITEM.push({
        path: 'products',
        title: 'Products',
        icon: 'product-hunt',
        children: [
          {
            path: '/',
            title: 'Products',
            icon: 'product-hunt'
          },

          {
            path: 'categories',
            title: 'Categories',
            icon: 'list'
          },
        ]
      });

      MENU_ITEM.push({
        path: 'deal',
        title: 'Deals',
        icon: 'product-hunt',

      })
    }

    if (userPermission.includes('6') || userPermission.includes('1')) {
      MENU_ITEM.push({
        path: 'users',
        title: 'Users',
        icon: 'users',

      })
    }

    if (userPermission.includes('2') || userPermission.includes('1')) {
      MENU_ITEM.push({

        path: 'customer',
        title: 'Customers',
        icon: 'list'
      }
      )
    }

    if (userPermission.includes('3') || userPermission.includes('1')) {
      MENU_ITEM.push({
        path: 'orders',
        title: 'Orders',
        icon: 'list',
      })
    }
  }
} else {

}
import { Component, OnDestroy, Inject,OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { LoginUser } from '../../model/loginuser';
import { AuthenticationService } from '../../views/authentication.service';
import { salesNavItems} from '../../_nav';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [ToastrService]
})
export class DefaultLayoutComponent implements OnDestroy {
  // public navItems = navItems;
  navItems=[]
  sideMenuList=[
    {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Company',
    url: '/theme/company-list',
    icon: 'icon-info'
  },
  {
    name: 'Trucks',
    url: '/theme/trucks-list',
    icon: 'icon-info'
  },
  {
    name: 'Trailers',
    url: '/theme/trailers-list',
    icon: 'icon-info'
  },
  {
    name: 'Driver',
    url: '/theme/driver-list',
    icon: 'icon-info'
  },
  {
    name: 'Carrier',
    url: '/theme/carrier-list',
    icon: 'icon-info'
  },
  {
    name: 'Customers',
    url: '/theme/customers-list',
    icon: 'icon-info'
  },
  {
    name: 'Dispatcher',
    url: '/theme/dispatcher-list',
    icon: 'icon-info'
  },
  {
    name: 'Vendor',
    url: '/theme/vendor-list',
    icon: 'icon-info'
  },
  {
    name: 'Factor',
    url: '/theme/factor-list',
    icon: 'icon-info'
  },
  {
    name: 'Fuel Card',
    url: '/theme/fuelcard',
    icon: 'icon-info'
  },
  {
    name: 'Accident',
    url: '/theme/accident',
    icon: 'icon-info'
  },
  {
    name: 'Map (Trucks/Drivers)',
    url: '/theme/map',
    icon: 'icon-info'
  }
  ]
  driverMenuList=[
    {
    name: 'Driver',
    url: '/theme/driver-list',
    icon: 'icon-info'
  }
  ]
  public salesNavItems = salesNavItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public loginUser: LoginUser;
  public usertype :string;
  private value:any = {};
  data: any;
  userid={}
  companylinkeddata=[]
  selectedCompany=undefined
  constructor(
    private authService: AuthenticationService,
    private _companyservice: CompanyService,
    private router:Router,
    private _toaster: ToastrService,
    @Inject(DOCUMENT) _document?: any
    
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  } 

  ngOnInit(): void {
    if (localStorage.selectedCompanyName != undefined) {
      this.selectedCompany = localStorage.selectedCompanyName      
    }
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      console.log(this.loginUser['_id'])
      console.log(this.loginUser['role']['name'])
      if(this.loginUser['role']['name'] == 'Driver'){
        this.navItems=this.driverMenuList
        this.router.navigateByUrl('theme/driver-list');
      }else{
        this.navItems=this.sideMenuList
      }
      if (this.loginUser) {
          this.userid= this.loginUser['_id']
         this.getData();
         this.getlinkedcompanydata()
         if (!this.selectedCompany) {
          this.selectedCompany = this.loginUser['company']['companyname'];
          localStorage.setItem('selectedCompany',this.loginUser['company']['_id']);
          localStorage.setItem('selectedCompanyName',this.selectedCompany);
         }
      }
    }
  }
  getlinkedcompanydata(){
    this.companylinkeddata=[]
    this._companyservice.getcompanylistinfo(this.userid).subscribe(data => {
      console.log(data)
      this.companylinkeddata = data
    })
  }
  getData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  showLoadstatus() {
    this.router.navigateByUrl('loadstatus');
  }

  companyselected(cmp) {
    localStorage.setItem('selectedCompany',cmp._id)
    localStorage.setItem('selectedCompanyName',cmp.companyname)
    var cmpid = localStorage.getItem("selectedCompany")
    this.userid= this.loginUser['_id']
    console.log(cmpid)
    console.log(this.userid)
    this._toaster.success(cmp.companyname+" selected successfully", "Success", {timeOut: 2000,});
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
      this._companyservice.getcompanyroleinfo(cmpid,this.userid).subscribe(data => {
      console.log(data)
    })
  }


  Logout(){
    this.authService.clearAuthentication()
  }
}

<!DOCTYPE html>
<html lang="zxx">

<head>
   <title>Quotation : {{$quote['Ref']}}</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta charset="UTF-8">

   <!-- External CSS libraries -->
   <link type="text/css" rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
   <link type="text/css" rel="stylesheet" href="{{ asset('assets/fonts/font-awesome/css/font-awesome.min.css') }}">

   <!-- Favicon icon -->
   <link rel="shortcut icon" href="{{ asset('assets/img/favicon.ico') }}" type="image/x-icon">

   <!-- Google fonts -->
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900">

   <!-- Custom Stylesheet -->
   <link type="text/css" rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
</head>

<body>

   <!-- Invoice 1 start -->
   <div class="invoice-1 invoice-content">
      <div class="container">
         <div class="row">
            <div class="col-lg-12">
               <div class="invoice-inner clearfix">
                  <div class="invoice-info clearfix" id="invoice_wrapper">
                     <div class="invoice-headar" style="background-color: white;">
                        <div class="row g-0">
                           <div class="col-sm-6">
                              <!-- <div class="invoice-logo"> -->
                              <!-- logo started -->
                              <!-- <div class="logo"> -->
                              <div class="px-5" style="background-color: white;">
                                 <img src="{{asset('/images/'.$setting['logo'])}}" style="height: 180px; width: auto;" alt="logo">
                              </div>
                              <!-- </div> -->
                              <!-- logo ended -->
                              <!-- </div> -->
                           </div>
                           <div class="col-sm-6 invoice-id">
                              <div class="info">
                                 <h1 class="color-white inv-header-1">Quote</h1>
                                 <p class="color-white mb-1">Quote Number <span>{{$quote['Ref']}}</span></p>
                                 <p class="color-white mb-0">Quote Date <span>{{$quote['date']}}</span></p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="invoice-top">
                        <div class="row">
                           <div class="col-sm-6">
                              <div class="invoice-number mb-30">
                                 <!-- <div class="invoice-number-inner"> -->
                                    <h4 class="inv-title-1">Quote From</h4>
                                    <h2 class="name mb-10">{{$setting['CompanyName']}}</h2>
                                    <p class="invo-addr-1">
                                       {{$setting['CompanyPhone']}} <br />
                                       {{$setting['email']}} <br />
                                       {{$setting['CompanyAdress']}} <br />
                                    </p>
                                 <!-- </div> -->
                              </div>
                           </div>
                           <div class="col-sm-6">
                              <div class="invoice-number mb-30">
                                 <div class="invoice-number-inner">
                                 <h4 class="inv-title-1">Customer</h4>
                                 <h2 class="name mb-10">{{$quote['client_name']}}</h2>
                                 <p class="invo-addr-1">
                                    {{$quote['client_phone']}} <br />
                                    {{$quote['client_email']}} <br />
                                    {{$quote['client_adr']}} <br />
                                    @if($quote['client_tax']){{$quote['client_tax']}}@endif
                                 </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="invoice-center">
                        <div class="mb-30 dear-client">
                           <h3 class="inv-title-1">Scope of Work</h3>
                           @if($quote['notes'] !== null)
                           <p id="description">
                              {{$quote['notes']}}
                           </p>
                           @else
                           <p>N/A</p>
                           @endif
                        </div>

                        <div class="table-responsive">
                           <table class="table mb-0 table-striped invoice-table">
                              <thead class="bg-active">
                                 <tr class="tr">
                                    <th class="pl-1 text-start">PRODUCT</th>
                                    <th class="text-center">UNIT PRICE</th>
                                    <th class="text-center">QUANTITY</th>
                                    <th class="text-center">DISCOUNT</th>
                                    <!-- <th class="text-center">TAX</th> -->
                                    <th class="text-end">TOTAL</th>
                                 </tr>
                                 </tr>
                              </thead>

                              <tbody>


                                 @foreach ($details as $detail)
                                 <tr>
                                    <td class="pl-1">
                                       <span>{{$detail['code']}} ({{$detail['name']}})</span>
                                       @if($detail['is_imei'] && $detail['imei_number'] !==null)
                                       <p>IMEI/SN : {{$detail['imei_number']}}</p>
                                       @endif
                                    </td>
                                    <td class="text-center"> {{$symbol}} {{$detail['price']}} </td>
                                    <td class="text-center">{{$detail['quantity']}} {{$detail['unitSale']?? 'pic'}}</td>
                                    <td class="text-center"> {{$symbol}} {{$detail['DiscountNet']}} </td>
                                    <!-- <td class="text-center">{{$detail['taxe']}} </td> -->
                                    <td class="text-end">{{$symbol}} {{$detail['total']}} </td>
                                 </tr>
                                 @endforeach

                                 <tr class="tr2">
                                    <!-- <td></td> -->
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center">SubTotal</td>
                                    <td class="text-end"> {{$symbol}} {{ $subTotal }}</td>
                                 </tr>
                                 <tr class="tr2">
                                    <!-- <td></td> -->
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center">Tax</td>
                                    <td class="text-end"> {{$symbol}} {{$quote['TaxNet']}}</td>
                                 </tr>
                                 <tr class="tr2">
                                    <!-- <td></td> -->
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center f-w-600 active-color">Grand Total</td>
                                    <td class="f-w-600 text-end active-color">{{$symbol}} {{$quote['GrandTotal']}}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div class="invoice-bottom">
                        <div class="row">
                           <!-- <div class="col-lg-6 col-md-8 col-sm-7">
                              <div class="mb-30 dear-client">
                                 <h3 class="inv-title-1">Scope of Work</h3>
                                 @if($quote['notes'] !== null)
                                 <p id="description">
                                    {{$quote['notes']}}
                                 </p>
                                 @else
                                 <p>N/A</p>
                                 @endif
                              </div>
                           </div> -->
                           <!-- <div class="col-lg-6 col-md-4 col-sm-5">
                              <div class="mb-30 payment-method">
                                 <h3 class="inv-title-1">Payment Method</h3>
                                 <ul class="payment-method-list-1 text-14">
                                    <li><strong>Account No:</strong> 00 123 647 840</li>
                                    <li><strong>Account Name:</strong> Jhon Doe</li>
                                    <li><strong>Branch Name:</strong> xyz</li>
                                 </ul>
                              </div>
                           </div> -->
                        </div>
                     </div>
                     <div class="invoice-contact clearfix">
                        <div class="row g-0">
                           <div class="col-lg-9 col-md-11 col-sm-12">
                              <div class="contact-info">
                                 <a href="tel:+55-4XX-634-7071"><i class="fa fa-phone"></i> {{$setting['CompanyPhone']}}</a>
                                 <a href="tel:info@themevessel.com"><i class="fa fa-envelope"></i> {{$setting['email']}}</a>
                                 <a href="tel:info@themevessel.com" class="mr-0 d-none-580"><i class="fa fa-map-marker"></i> {{$setting['CompanyAdress']}}</a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="invoice-btn-section clearfix d-print-none">
                     <a href="javascript:window.print()" class="btn btn-lg btn-print">
                        <i class="fa fa-print"></i> Print Quote
                     </a>
                     <a id="invoice_download_btn" class="btn btn-lg btn-download btn-theme">
                        <i class="fa fa-download"></i> Download Quote
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- Invoice 1 end -->

   <script src="{{asset('assets/js/jquery.min.js')}}"></script>
   <script src="{{asset('assets/js/jspdf.min.js')}}"></script>
   <script src="{{asset('assets/js/html2canvas.js')}}"></script>
   <script src="{{asset('assets/js/app.js')}}"></script>
</body>

</html>
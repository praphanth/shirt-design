<script type="text/javascript">
  var url_root = "<?php echo base_url(); ?>";
</script>
    <!-- Footer Section Begin -->
    <footer class="footer-section">
        <div class="container">
            <div class="footer-text">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="ft-about">
                            <div class="logo">
                                <a href="#">
                                    <?php echo $this->setting->getHeaderImage(); ?>
                                    &nbsp;
                                    <span class="h5"><?php echo $this->setting->getNameCompany('en'); ?></span>
                                </a>
                            </div>
                            <p><?php echo $this->setting->getDetail(); ?></p>
                            <div class="fa-social">
                                <a href="<?php echo $this->setting->getFacebook(); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="http://line.me/ti/p/~<?php echo $this->setting->getLine(); ?>" target="_blank"><i class="fab fa-line"></i></a>
                                <a href="<?php echo $this->setting->getTwitter(); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
                                <a href="<?php echo $this->setting->getInstagram(); ?>" target="_blank"><i class="fa fa-instagram"></i></a>
                                <a href="<?php echo $this->setting->getYoutube(); ?>" target="_blank"><i class="fa fa-youtube-play"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-1">
                        <div class="ft-contact">
                            <h6>ติดต่อเรา</h6>
                            <ul>
                                <li>Tel : <?php echo $this->setting->getPhone(); ?></li>
                                <li>Email : <?php echo $this->setting->getEmail(); ?></li>
                                <li>Line ID : <?php echo $this->setting->getLine(); ?></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-1">
                        <div class="ft-newslatter">
                            <h6>การชำระเงิน</h6>
                            <p><?php echo $this->setting->getPay(); ?></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5">
                        <ul>
                            <li><a href="#">หน้าแรก</a></li>
                            <li><a href="#">บริการของเรา</a></li>
                            <li><a href="#">ติดต่อเรา</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-7">
                        <div class="co-text">
                            <p><?php echo $this->setting->getFooterTitle() ?>
                            | Template by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                            | Created by <a href="https://www.matumweb.com/" target="_blank">Matumweb</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer Section End -->

    <!-- Search model Begin -->
    <div class="search-model">
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="search-close-switch"><i class="icon_close"></i></div>
            <form class="search-model-form">
                <input type="text" id="search-input" placeholder="Search here.....">
            </form>
        </div>
    </div>
    <!-- Search model end -->

    <!-- Js Plugins -->
    <script src="<?php echo base_url('assets/system/js/jquery-3.3.1.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/bootstrap.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/jquery.magnific-popup.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/jquery.nice-select.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/jquery-ui.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/popper.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/jquery.slicknav.js'); ?>"></script>
    <script src="<?php echo base_url('assets/system/js/owl.carousel.min.js'); ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.js"></script>
    <script src="<?php echo base_url('assets/system/js/main.js'); ?>"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.5/fabric.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.2/fabric.min.js"></script>
    
</body>
</html>
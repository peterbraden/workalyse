BOOTSTRAP = ./public/css/bootstrap.css
BOOTSTRAP_LESS = ./less/bootstrap.less
BOOTSTRAP_RESPONSIVE = ./public/css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less/responsive.less
LESS_COMPRESSOR ?= `which lessc`
WATCHR ?= `which watchr`

#
# BUILD WORKALYSE
#

workalyse: 
	rm -r public
	mkdir -p public/img
	mkdir -p public/css
	mkdir -p public/js
	
	lessc ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	lessc --compress ${BOOTSTRAP_LESS} > public/css/bootstrap.min.css
	lessc ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	lessc ${BOOTSTRAP_RESPONSIVE_LESS} > public/css/bootstrap-responsive.css
	
	cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js > public/js/bootstrap.js
	uglifyjs -nc public/js/bootstrap.js > public/js/bootstrap.min.tmp.js
	cat js/copyright.js public/js/bootstrap.min.tmp.js > public/js/bootstrap.min.js
	rm public/js/bootstrap.min.tmp.js
	
	cp img/* public/img/
	cp js/*.js public/js/
	cp js/tests/vendor/jquery.js public/js/
	cp templates/*.html public

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"

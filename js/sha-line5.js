// sha-line5.js
// https://github.com/suhacerci/sha-line5.git
//
// Copyright (c) 2017, Süha Çerçi
// Released under the MIT license
;(function($) {

    var Line5 = {
        init: function(opt, dis) {
            var self = this;

            self.dis = dis;
            self.$dis = $(dis);
            self.turnMove = Math.floor(Math.random()) + 1;
            self.allMoves = [];
            self.possibleMoves = ["red", "green"];
            self.winingPositions = [];
            self.squareWidth = 0;
            self.settings = $.extend(true, {}, $.fn.line5.settings, opt);
            self.createBoard();
            self.allEvents();

        },
        createBoard: function() {
            var boardWidth = (this.settings.width !== false) ? this.settings.width : this.$dis.width();
            
            while (boardWidth % this.settings.size !== 0)
                boardWidth--;

            this.$dis.width(boardWidth);
            var color = 0;
            var coor = 0;
            var html = '';

            for (var i = 0; i < this.settings.size; ++i) {

                for (var j = 0; j < this.settings.size; ++j) {

                    html += '<div class="empty square square-'+color+'" data-coor="' + coor + '"></div>';
                    this.allMoves[coor++] = -1;
                    color = Math.abs(color-1);
                }
                html += '<div class="clearfix"></div>';
                color = this.settings.size % 2 === 0 ? Math.abs(color-1) : color;
            }
            this.$dis.html(html);
            this.configureBoard(boardWidth);

        },
        configureBoard: function(bw) {
            var squareW = (bw / this.settings.size);
            this.squareWidth = squareW;
            this.$dis.find('.square').css('width', squareW + 'px').css('height', squareW + 'px');

        },
        allEvents: function() {
            var self = this;
            this.$dis.find(".square").on('click', function(event) {
                event.preventDefault();
                var coor = parseInt($(this).data("coor"));
                if (self.allMoves[coor] > -1) return false;
                $(this).html('<img  class="squareimg" src="images/' + self.possibleMoves[self.turnMove] + '.png">').removeClass('empty').find("img").css("width", (self.squareWidth - 6) + "px").fadeIn(200);
                self.allMoves[coor] = self.turnMove;
                self.checkWinx(coor) && self.endProcess();
                self.checkWiny(coor) && self.endProcess();
                self.checkWindl(coor) && self.endProcess();
                self.checkWindr(coor) && self.endProcess();
                self.turnMove = Math.abs(--self.turnMove);

            });



        },
        checkWinx: function(target) {
            var temp = target;
            var count = 1;
            var sidedirection = -1;
            var controldirection = 1;

            // x düzleminde check
            this.winingPositions = [];
            (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
            temp = temp + sidedirection;
            while (count < this.settings.level) {
                if ((this.allMoves[temp + controldirection] === this.allMoves[temp]) && (parseInt(temp / this.settings.size) === parseInt((temp + controldirection) / this.settings.size))) {

                    count++;
                    (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
                    if ((count) >= this.settings.level)
                        return true;




                    temp = temp + sidedirection;
                    continue;
                }




                if (sidedirection > 0) {
                    break;
                }
                sidedirection = -sidedirection;
                controldirection = -controldirection;
                temp = target + sidedirection;
                continue;


            } // end of x side while




        },

        checkWiny: function(target) {
            var temp = target;
            var count = 1;

            var sidedirection = -1;
            var controldirection = 1;
            this.winingPositions = [];
            (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
            temp = temp + sidedirection * this.settings.size;
            while (count < this.settings.level) {

                if ((this.allMoves[temp + controldirection * this.settings.size] === this.allMoves[temp])) {

                    count++;
                    (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
                    if ((count) >= this.settings.level)
                        return true;




                    temp = temp + sidedirection * this.settings.size;
                    continue;
                }


                if (sidedirection > 0) {
                    break;
                }
                sidedirection = -sidedirection;
                controldirection = -controldirection;
                temp = target + sidedirection * this.settings.size;
                continue;


            } // end of y side while


        },
        checkWindl: function(target) {
            var temp = target;
            var count = 1;

            var ddirection = -1;
            var sidedirection = -1;
            var controldirection = 1;
            this.winingPositions = [];
            (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
            temp = (temp + sidedirection * this.settings.size) + ddirection;
            while (count < this.settings.level) {

                if ((this.allMoves[(temp + controldirection) + controldirection * this.settings.size] === this.allMoves[temp]) && ((temp) % this.settings.size) - (((temp + controldirection) + controldirection * this.settings.size) % this.settings.size) === ddirection) {

                    count++;
                    (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
                    if ((count) >= this.settings.level)
                        return true;




                    temp = (temp + sidedirection * this.settings.size) + ddirection;
                    continue;
                }


                if (sidedirection > 0) {
                    break;
                }
                ddirection = -ddirection;
                sidedirection = -sidedirection;
                controldirection = -controldirection;
                temp = (target + sidedirection * this.settings.size) + ddirection;
                continue;


            } // end of lefty diagonal side while


        },

        checkWindr: function(target) {
            var temp = target;
            var count = 1;

            var ddirection = 1;
            var sidedirection = -1;
            var controldirection = 1;
            this.winingPositions = [];
            (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
            temp = (temp + sidedirection * this.settings.size) + ddirection;
            while (count < this.settings.level) {

                if ((this.allMoves[(temp - controldirection) + controldirection * this.settings.size] === this.allMoves[temp]) && ((temp) % this.settings.size) - (((temp - controldirection) + controldirection * this.settings.size) % this.settings.size) === ddirection) {

                    count++;
                    (this.winingPositions.indexOf(temp) === -1) && this.winingPositions.push(temp);
                    if ((count) >= this.settings.level)
                        return true;




                    temp = (temp + sidedirection * this.settings.size) + ddirection;
                    continue;
                }


                if (sidedirection > 0) {
                    break;
                }
                ddirection = -ddirection;
                sidedirection = -sidedirection;
                controldirection = -controldirection;
                temp = (target + sidedirection * this.settings.size) + ddirection;
                continue;


            } // end of Righty diagonal side while


        },
        endProcess: function() {
            var self = this;
           
            this.$dis.find(".square").off("click");

            this.winingPositions.forEach(function(element, index) {
                setTimeout(function() {
                    self.$dis.find(".square[data-coor='" + element + "']").find("img").addClass('outline shaking');
                  


                }, 300 * index);
          


            });



               setTimeout(function() {
                     if (self.$dis.find('.overlay').length === 0) 
	                 self.$dis.append("<div class='overlay'><div class='resul-panel'><span class='result'>"+self.possibleMoves[Math.abs(self.turnMove-1)]+" WON</span><button>play ?</button></div></div>");
	                   
                   }, self.winingPositions.length*300);


               this.$dis.on('click','button',function(e) {
               	// body...
               e.preventDefault();
               self.init(self.settings, self.dis);
               });

        }


    };






    $.fn.line5 = function(options) {

        return this.each(function(index, el) {
            var line5 = Object.create(Line5);
            line5.init(options, this);
        });


    };

    $.fn.line5.settings = {
        size: 12,
        width: false,
        level: 4
    };




})(jQuery);
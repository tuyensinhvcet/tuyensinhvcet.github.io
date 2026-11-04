/* Thẻ nghề tương lai – Trường Cao đẳng Kỹ thuật - Công nghệ Vĩnh Phúc. Tạo tự động (the_nghe.py) từ Excel trang tính The-nghe, không sửa tay. */
/* QR Code – thư viện mã nguồn mở (Apache 2.0), từ qrcode-terminal (gốc: Kazuhiko Arase, MIT) */
var QRGEN=(function(){var C={},F={
"./QRErrorCorrectLevel":function(module,exports,require){module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};


},
"./QRPolynomial":function(module,exports,require){var QRMath = require('./QRMath');

function QRPolynomial(num, shift) {
	if (num.length === undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] === 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var x = 0; x < e.getLength(); x++) {
			num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);
		}
	
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;

},
"./QRMaskPattern":function(module,exports,require){module.exports = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

},
"./QRMode":function(module,exports,require){module.exports = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

},
"./QRUtil":function(module,exports,require){var QRMode = require('./QRMode');
var QRPolynomial = require('./QRPolynomial');
var QRMath = require('./QRMath');
var QRMaskPattern = require('./QRMaskPattern');

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],        
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data !== 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
        
        switch (maskPattern) {
            
        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;
        case QRMaskPattern.PATTERN001 : return i % 2 === 0;
        case QRMaskPattern.PATTERN010 : return j % 3 === 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {


            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {


            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {


            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {
        
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0; 
        var col = 0;

        
        
        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r === 0 && c === 0) {
                            continue;
                        }

                        if (dark === qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }


        for (row = 0; row < moduleCount - 1; row++) {
            for (col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count === 0 || count === 4) {
                    lostPoint += 3;
                }
            }
        }


        for (row = 0; row < moduleCount; row++) {
            for (col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) && 
                        !qrCode.isDark(row, col + 1) && 
                         qrCode.isDark(row, col + 2) && 
                         qrCode.isDark(row, col + 3) && 
                         qrCode.isDark(row, col + 4) && 
                        !qrCode.isDark(row, col + 5) && 
                         qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                        !qrCode.isDark(row + 1, col) &&
                         qrCode.isDark(row + 2, col) &&
                         qrCode.isDark(row + 3, col) &&
                         qrCode.isDark(row + 4, col) &&
                        !qrCode.isDark(row + 5, col) &&
                         qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        
        var darkCount = 0;

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }
        
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;       
    }

};

module.exports = QRUtil;

},
"./QRMath":function(module,exports,require){var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;

},
"./QR8bitByte":function(module,exports,require){var QRMode = require('./QRMode');

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function() {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;

},
"./index":function(module,exports,require){
var QR8bitByte = require('./QR8bitByte');
var QRUtil = require('./QRUtil');
var QRPolynomial = require('./QRPolynomial');
var QRRSBlock = require('./QRRSBlock');
var QRBitBuffer = require('./QRBitBuffer');

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var x = 0; x < this.dataList.length; x++) {
					var data = this.dataList[x];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache === null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 
                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 
                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i === 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] !== null) {
				continue;
			}
			this.modules[r][6] = (r % 2 === 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] !== null) {
				continue;
			}
			this.modules[6][c] = (c % 2 === 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] !== null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (Math.abs(r) === 2 || 
                            Math.abs(c) === 2 ||
                            (r === 0 && c === 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
	
		for (var i = 0; i < 18; i++) {
			mod = (!test && ( (bits >> i) & 1) === 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var x = 0; x < 18; x++) {
			mod = (!test && ( (bits >> x) & 1) === 1);
			this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
	
		for (var v = 0; v < 15; v++) {
	
			mod = (!test && ( (bits >> v) & 1) === 1);
	
			if (v < 6) {
				this.modules[v][8] = mod;
			} else if (v < 8) {
				this.modules[v + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + v][8] = mod;
			}
		}
	
		for (var h = 0; h < 15; h++) {
	
			mod = (!test && ( (bits >> h) & 1) === 1);
			
			if (h < 8) {
				this.modules[8][this.moduleCount - h - 1] = mod;
			} else if (h < 9) {
				this.modules[8][15 - h - 1 + 1] = mod;
			} else {
				this.modules[8][15 - h - 1] = mod;
			}
		}
	
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col === 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] === null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	var totalDataCount = 0;
	for (var x = 0; x < rsBlocks.length; x++) {
		totalDataCount += rsBlocks[x].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. (" + 
            buffer.getLengthInBits() + 
            ">" +  
            totalDataCount * 8 + 
            ")");
	}

	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	while (buffer.getLengthInBits() % 8 !== 0) {
		buffer.putBit(false);
	}

	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var x = 0; x < ecdata[r].length; x++) {
            var modIndex = x + modPoly.getLength() - ecdata[r].length;
			ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var y = 0; y < rsBlocks.length; y++) {
		totalCodeCount += rsBlocks[y].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var z = 0; z < maxDcCount; z++) {
		for (var s = 0; s < rsBlocks.length; s++) {
			if (z < dcdata[s].length) {
				data[index++] = dcdata[s][z];
			}
		}
	}

	for (var xx = 0; xx < maxEcCount; xx++) {
		for (var t = 0; t < rsBlocks.length; t++) {
			if (xx < ecdata[t].length) {
				data[index++] = ecdata[t][xx];
			}
		}
	}

	return data;

};

module.exports = QRCode;

},
"./QRBitBuffer":function(module,exports,require){function QRBitBuffer() {
	this.buffer = [];
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;

},
"./QRRSBlock":function(module,exports,require){var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [


	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock === undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = [];
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
};

module.exports = QRRSBlock;

}};function R(n){n=n.replace(/^\.\//,"./");if(n==="./index"||n==="./")n="./index";if(C[n])return C[n].exports;var m={exports:{}};C[n]=m;F[n](m,m.exports,R);return m.exports}
var Q=R("./index"),L=R("./QRErrorCorrectLevel");return function(t){var q=new Q(-1,L.M);q.addData(t);q.make();return q.modules}})();

var TheNghe=(function(){"use strict";
const THE={"Công nghệ ô tô":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Chuyên gia kiểm định ô tô","Kỹ thuật viên điện, điều hòa ô tô","Quản lý ga-ra ô tô"]},"Công nghệ kỹ thuật cơ khí":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Lập trình viên máy CNC","Nhà thiết kế sản phẩm cơ khí","Chuyên viên kiểm soát chất lượng"]},"Cắt gọt kim loại":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên gia công CNC","Quản đốc phân xưởng cơ khí","Chủ xưởng gia công cơ khí"]},"Cơ khí chế tạo":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên gia công CNC","Tổ trưởng sản xuất cơ khí","Chủ xưởng gia công cơ khí"]},"Hàn":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Thợ hàn TIG, MIG chuyên nghiệp","Kỹ thuật viên vận hành robot hàn","Chủ xưởng cơ khí, hàn"]},"Cơ điện tử":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên dây chuyền tự động","Lập trình viên điều khiển tự động","Trưởng bộ phận kỹ thuật"]},"Công nghệ kỹ thuật điện, điện tử":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Nhà thiết kế mạch điện tử","Kỹ thuật viên hệ thống điện","Giám sát dự án điện, điện tử"]},"Công nghệ kỹ thuật điều khiển và tự động hóa":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Lập trình viên hệ thống tự động","Chuyên gia vận hành tự động hóa","Quản trị hệ thống điều khiển"]},"Điện công nghiệp":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên điện nhà máy","Trưởng nhóm kỹ thuật điện","Chủ xưởng sửa chữa, lắp đặt điện"]},"Điện công nghiệp và dân dụng":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên điện dân dụng","Kỹ thuật viên máy điện","Chủ dịch vụ thi công điện"]},"Điện tử công nghiệp":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên điện tử công nghiệp","Chuyên viên hệ thống an ninh, giám sát","Kỹ thuật viên điện mặt trời"]},"Công nghệ vi mạch bán dẫn":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên vi mạch bán dẫn","Chuyên viên kỹ thuật vi mạch","Kỹ thuật viên công nghệ cao"]},"Kỹ thuật máy lạnh và điều hòa không khí":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên điện lạnh","Chuyên gia điều hòa trung tâm","Chủ cửa hàng dịch vụ điện lạnh"]},"Công nghệ cơ khí, sưởi ấm và điều hòa không khí":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên hệ thống HVAC","Chuyên viên thông gió, điều hòa tòa nhà","Kỹ thuật viên cơ điện"]},"Truyền thông và mạng máy tính":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Quản trị mạng máy tính","Chuyên viên IT doanh nghiệp","Kỹ thuật viên hỗ trợ IT"]},"Công nghệ thông tin (Ứng dụng phần mềm)":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Nhà thiết kế phần mềm","Chuyên viên bảo mật thông tin","Nhà thiết kế website"]},"Kỹ thuật sửa chữa, lắp ráp máy tính":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên phần cứng máy tính","Chuyên viên lắp đặt hệ thống mạng","Chủ dịch vụ sửa chữa máy tính"]},"Tin học văn phòng":{"cd":"Kỹ sư thực hành","tc":"Kỹ thuật viên","n":["Chuyên viên dữ liệu văn phòng","Nhà thiết kế đồ họa, video","Thư ký văn phòng chuyên nghiệp"]},"Thương mại điện tử":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Chuyên viên tiếp thị trực tuyến","Chuyên viên giao dịch thương mại điện tử","Quản lý website bán hàng"]},"Marketing thương mại":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Chuyên viên digital marketing","Quản lý nhãn hàng","Chuyên viên thương hiệu, truyền thông"]},"Logistics":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Giám sát kho vận","Chuyên viên giao nhận hàng hóa","Chuyên viên hành chính logistics"]},"Kế toán":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Kế toán doanh nghiệp xuất nhập khẩu","Chuyên viên thuế, tài chính","Kế toán đơn vị sự nghiệp"]},"Kế toán doanh nghiệp":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Kế toán doanh nghiệp sản xuất","Kế toán xuất nhập khẩu","Kế toán thương mại, dịch vụ"]},"Quản trị kinh doanh":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Chuyên viên kinh doanh","Chuyên viên nhân sự","Nhà khởi nghiệp kinh doanh"]},"Quản trị khách sạn":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Giám sát lễ tân khách sạn","Quản lý nhà hàng, khách sạn","Chuyên viên dịch vụ hội nghị, du lịch"]},"Kỹ thuật chế biến món ăn":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Đầu bếp bếp Âu, bếp Á","Bếp trưởng nhà hàng","Chủ quán ăn, tiệm bánh"]},"Chăm sóc sắc đẹp":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Kỹ thuật viên spa, salon","Chủ salon, spa, tiệm nail","Chuyên viên tư vấn mỹ phẩm"]},"May thời trang":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Nhà thiết kế, may mẫu thời trang","Chủ cửa hàng may đo","Giám sát sản xuất may"]},"Dịch vụ thú y":{"cd":"Cử nhân thực hành","tc":"Kỹ thuật viên","n":["Chuyên viên chẩn đoán, điều trị vật nuôi","Chuyên viên chăm sóc thú cưng","Chuyên viên phòng chống dịch bệnh"]},"Thú y":{"cd":"Cử nhân thực hành","tc":"Kỹ thuật viên","n":["Chuyên viên chẩn đoán, điều trị vật nuôi","Chuyên viên sản xuất thuốc thú y","Nhà kinh doanh thức ăn chăn nuôi"]},"Chăn nuôi – thú y":{"cd":"Cử nhân thực hành","tc":"Kỹ thuật viên","n":["Kỹ thuật viên trang trại","Kỹ thuật viên sản xuất con giống","Chủ dịch vụ thú y"]},"Tiếng Trung Quốc":{"cd":"Cử nhân thực hành","tc":"Chuyên viên","n":["Phiên dịch viên tiếng Trung","Trợ lý, thư ký tiếng Trung","Chuyên viên xuất nhập khẩu"]}},ANH={"co":"nghe-co-khi-o-to.jpg","dien":"nghe-dien-dien-tu.jpg","it":"nghe-cong-nghe-thong-tin.jpg","kd":"nghe-kinh-te.jpg","dv":"nghe-dich-vu.jpg","ny":"nghe-thu-y.jpg","nn":"chuong-trinh-tieng-trung.jpg"},MAU={"co":["#274081","#26A8D4"],"dien":["#1d3c8f","#f5a524"],"it":["#3b1f8f","#26A8D4"],"kd":["#0a5a3d","#1fb57a"],"dv":["#8a1f5a","#ff7aa8"],"ny":["#2f6b1f","#8bc34a"],"nn":["#8a1c1c","#ff6b3d"]};
const W=1080,H=1920,F="'Be Vietnam Pro',Inter,'Segoe UI',Arial,sans-serif",URL_QR="https://tuyensinhvcet.vn/?nguon=the-nghe#trac-nghiem";
const ROOT=(function(){try{return document.currentScript.src.replace(/the-nghe\.js.*$/,"")}catch(e){return "/"}})();
function img(src){return new Promise(ok=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>ok(null);i.src=src})}
function cover(x,i,dx,dy,dw,dh){if(!i)return;const r=Math.max(dw/i.width,dh/i.height),w=i.width*r,h=i.height*r;x.drawImage(i,dx+(dw-w)/2,dy+(dh-h)/2,w,h)}
let PM={mx:0,my:0};
function coverP(x,i,dx,dy,dw,dh,z,ox,oy){const r=Math.max(dw/i.width,dh/i.height)*z,w=i.width*r,h=i.height*r,mx=(w-dw)/2,my=(h-dh)/2;PM={mx,my};x.drawImage(i,dx-mx*(1+ox),dy-my*(1+oy),w,h)}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function lines(x,t,maxW){const w=String(t).split(/\s+/),L=[];let c="";w.forEach(s=>{const n=c?c+" "+s:s;if(x.measureText(n).width>maxW&&c){L.push(c);c=s}else c=n});if(c)L.push(c);return L}
function fit(x,t,maxW,size,min,n){let s=size,L;do{x.font=`900 ${s}px ${F}`;L=lines(x,t,maxW);if(L.length<=n)break;s-=4}while(s>min);return{L,s}}
function grad(x,y0,y1,st){const g=x.createLinearGradient(0,y0,0,y1);st.forEach(([p,c])=>g.addColorStop(p,c));return g}
function qr(x,a,b,size){const m=QRGEN(URL_QR),n=m.length,q=4,c=size/(n+q*2);x.fillStyle="#fff";rr(x,a,b,size,size,18);x.fill();x.fillStyle="#0d1838";
  for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(m[r][k])x.fillRect(Math.floor(a+(k+q)*c),Math.floor(b+(r+q)*c),Math.ceil(c),Math.ceil(c))}
let LOGO=null;
// o: {ten, nghe, danhHieu, dong2, nhom, g, manh:[3]}
async function ve(cv,o){cv.width=W;cv.height=H;const x=cv.getContext("2d");
  try{await Promise.all([document.fonts.load(`900 40px 'Be Vietnam Pro'`),document.fonts.load(`700 40px 'Be Vietnam Pro'`)])}catch(e){}
  const [ph,lg]=await Promise.all([o.anh?Promise.resolve(null):img(ROOT+"anh/"+(ANH[o.g]||ANH.co)),LOGO?Promise.resolve(LOGO):img(ROOT+"anh/logo-vcet.png")]);LOGO=lg;
  const [c1,c2]=MAU[o.g]||MAU.co,ten=(o.ten||"").trim().toUpperCase().slice(0,24)||"EM";
  const g=x.createRadialGradient(W/2,700,80,W/2,800,1200);g.addColorStop(0,c2);g.addColorStop(.45,c1);g.addColorStop(1,"#070d22");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.08;x.strokeStyle="#fff";x.lineWidth=2;for(let i=-H;i<W;i+=60){x.beginPath();x.moveTo(i,0);x.lineTo(i+H,H);x.stroke()}x.restore();
  x.textAlign="center";x.fillStyle="rgba(255,255,255,.92)";x.font=`800 36px ${F}`;x.fillText("THẺ NGHỀ TƯƠNG LAI CỦA",W/2,78);
  let ts=96;do{x.font=`900 ${ts}px ${F}`;ts-=4}while(x.measureText(ten).width>W-120&&ts>44);x.fillStyle=grad(x,90,170,[[0,"#fff3b0"],[.5,"#ffcc33"],[1,"#ff9d00"]]);x.fillText(ten,W/2,168,W-100);x.textAlign="left";
  const cx=90,cy=225,cw=W-180,ch=1295,PH=580;
  const hb=x.createLinearGradient(cx,cy,cx+cw,cy+ch);["#ffe58a","#ff9d00","#8ff0ff","#c58bff","#ffe58a"].forEach((c,i,a)=>hb.addColorStop(i/(a.length-1),c));
  rr(x,cx-10,cy-10,cw+20,ch+20,58);x.fillStyle=hb;x.fill();rr(x,cx,cy,cw,ch,48);x.fillStyle="#0d1838";x.fill();
  x.save();rr(x,cx+30,cy+30,cw-60,PH,32);x.clip();if(o.anh)coverP(x,o.anh,cx+30,cy+30,cw-60,PH,o.z||1,o.ox||0,o.oy==null?-.6:o.oy);else cover(x,ph,cx+30,cy+30,cw-60,PH);x.fillStyle=grad(x,cy+PH-220,cy+PH+30,[[0,"rgba(13,24,56,0)"],[1,"rgba(13,24,56,.9)"]]);x.fillRect(cx,cy,cw,PH+60);x.restore();
  x.font=`900 30px ${F}`;const nt=o.nhom.toUpperCase(),nw=Math.min(cw-120,x.measureText(nt).width+52);rr(x,cx+60,cy+60,nw,64,32);x.fillStyle="#ffcc33";x.fill();x.fillStyle="#0d1838";x.fillText(nt,cx+86,cy+103,nw-52);
  let y=cy+PH+60;const t=fit(x,o.nghe.toUpperCase(),cw-120,92,56,3);const gg=grad(x,y,y+t.L.length*t.s+20,[[0,"#fff3b0"],[.45,"#ffcc33"],[1,"#ff9d00"]]);x.fillStyle=gg;t.L.forEach(l=>{y+=t.s*1.04;x.fillText(l,cx+60,y)});
  y+=58;x.fillStyle="#8ff0ff";x.font=`800 40px ${F}`;x.fillText(o.danhHieu,cx+60,y,cw-120);y+=50;x.fillStyle="rgba(255,255,255,.78)";x.font=`600 32px ${F}`;x.fillText(o.dong2,cx+60,y,cw-120);
  y+=46;x.fillStyle="rgba(255,255,255,.2)";x.fillRect(cx+60,y,cw-120,2);y+=30;x.font=`800 30px ${F}`;x.fillStyle="#ffcc33";x.fillText("ĐIỂM MẠNH",cx+60,y+30);y+=56;
  o.manh.slice(0,3).forEach(m=>{if(y>cy+ch-40)return;x.fillStyle="#ffcc33";x.font=`900 36px ${F}`;x.fillText("★",cx+60,y+36);x.fillStyle="#fff";x.font=`700 38px ${F}`;x.fillText(m,cx+112,y+36,cw-180);y+=60});
  const fy=H-330,s=230;qr(x,W-70-s,fy,s);
  x.fillStyle="#fff";x.font=`900 46px ${F}`;x.fillText("Em hợp nghề gì?",70,fy+62);x.font=`700 34px ${F}`;x.fillStyle="rgba(255,255,255,.85)";x.fillText("Quét mã, làm thử 2 phút",70,fy+112);
  x.fillStyle="#ffcc33";x.font=`800 36px ${F}`;x.fillText("tuyensinhvcet.vn",70,fy+162);
  if(lg){x.save();x.beginPath();x.arc(100,fy+212,30,0,7);x.fillStyle="#fff";x.fill();x.drawImage(lg,72,fy+184,56,56);x.restore()}
  x.font=`600 22px ${F}`;x.fillStyle="rgba(255,255,255,.75)";x.fillText("Trường Cao đẳng Kỹ thuật -",146,fy+206);x.fillText("Công nghệ Vĩnh Phúc",146,fy+234);return cv}
function ev(p,t){try{if(window.goatcounter&&goatcounter.count)goatcounter.count({path:p,title:t,event:true})}catch(e){}}
const CSS=`.tn-ov{position:fixed;inset:0;z-index:90;background:rgba(7,13,34,.82);display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:16px}
.tn-box{background:#fff;color:#121a33;border-radius:20px;max-width:440px;width:100%;padding:16px;position:relative;margin:auto 0}
.tn-box h3{margin:0 40px 10px 0;font-size:1.15rem;color:#121a33}.tn-x{position:absolute;top:10px;right:10px;width:38px;height:38px;border-radius:50%;border:0;background:#eef1f7;font-size:18px;cursor:pointer;color:#121a33}
.tn-box label{display:block;font-weight:700;font-size:.9rem;color:#121a33}.tn-box input{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border:1.5px solid #d6deee;border-radius:12px;font:inherit;font-size:1rem;color:#121a33;background:#fff}
.tn-pv{margin:12px auto 0;max-width:300px}.tn-pv img{display:block;width:100%;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
.tn-note{font-size:.8rem;color:#5b6682;margin:8px 0 0;text-align:center}
.tn-btns{display:grid;gap:8px;margin-top:12px}.tn-btns button{border:0;border-radius:999px;padding:13px;font:inherit;font-weight:800;cursor:pointer}
.tn-share,.tn-tao{background:#ffb000;color:#121a33}.tn-tao:disabled{opacity:.45;cursor:default}.tn-s2[hidden],.tn-b0[hidden]{display:none}.tn-l{text-align:left!important;margin:6px 0 0!important}.tn-dl{background:#274081;color:#fff}.tn-anh{background:#eef1f7;color:#274081;border:1.5px dashed #274081!important}.tn-pv img.tn-keo{cursor:grab;touch-action:none}.tn-zm[hidden]{display:none}.tn-zm{display:flex;align-items:center;gap:8px;margin-top:10px;font-weight:700;font-size:.85rem;color:#3b4560}.tn-zm input{flex:1;margin:0;padding:0;border:0}.tn-doi{background:#fff;color:#274081;border:1.5px solid #274081!important}`;
let busy=0;
async function mo(d){if(busy)return;busy=1;ev("tao-the-nghe","Mở thẻ nghề");
  if(!document.getElementById("tn-css")){const s=document.createElement("style");s.id="tn-css";s.textContent=CSS;document.head.appendChild(s)}
  const T=THE[d.nganh]||{n:[d.nganh],cd:"",tc:""},nghe=T.n.filter(Boolean);let i=0;try{i=+(sessionStorage.getItem("vcet-tn-"+d.nganh)||Math.floor(Math.random()*nghe.length))%nghe.length;sessionStorage.setItem("vcet-tn-"+d.nganh,i)}catch(e){}
  const ov=document.createElement("div");ov.className="tn-ov";ov.innerHTML=`<div class="tn-box" role="dialog" aria-modal="true" aria-label="Thẻ nghề tương lai"><button type="button" class="tn-x" aria-label="Đóng">✕</button>
    <h3>Thẻ nghề tương lai của em</h3><label>Em tên gì?<input class="tn-ten" maxlength="24" placeholder="Ví dụ: Minh Anh" autocomplete="given-name"></label>
    <p class="tn-note tn-l">Tên chỉ in lên thẻ trên điện thoại của em, không gửi đi đâu.</p>
    <input type="file" class="tn-file" accept="image/*" hidden><div class="tn-btns tn-b0"><button type="button" class="tn-anh">📷 Thêm ảnh của em (nếu muốn)</button><button type="button" class="tn-tao" disabled>Tạo thẻ của em</button></div>
    <div class="tn-s2" hidden><div class="tn-pv"><img alt="Thẻ nghề tương lai"></div><label class="tn-zm" hidden>Kéo ảnh để căn · Phóng to<input type="range" class="tn-z" min="1" max="3" step="0.05" value="1" aria-label="Phóng to ảnh của em"></label><p class="tn-note">Không tải được thì nhấn giữ vào ảnh để lưu.</p>
    <div class="tn-btns"><button type="button" class="tn-share">Chia sẻ thẻ cho bạn</button><button type="button" class="tn-dl">Tải ảnh về</button><button type="button" class="tn-anh">📷 Thêm ảnh của em</button>${nghe.length>1?'<button type="button" class="tn-doi">Đổi nghề khác của ngành này</button>':""}</div></div></div>`;
  document.body.appendChild(ov);document.body.style.overflow="hidden";
  const cv=document.createElement("canvas"),im=ov.querySelector("img"),inp=ov.querySelector(".tn-ten");let ttm=0,blob=null,anh=null,z=1,ox=0,oy=-.6;
  const lv=d.k==="lt"||d.k==="cd"?"cd":"tc";
  const s2=ov.querySelector(".tn-s2"),tao=ov.querySelector(".tn-tao");
  const ten=()=>inp.value.trim().replace(/\s+/g," ");
  function dien(){const t=ten();if(!t)return;["m-name","l-name"].forEach(id=>{const e=document.getElementById(id);if(e&&(!e.value||e.dataset.tn)){e.value=t;e.dataset.tn="1"}})}
  async function draw(){if(!ten())return;blob=null;await ve(cv,{ten:inp.value,nghe:nghe[i],danhHieu:(lv==="cd"?T.cd:T.tc)||"",dong2:d.lvTen+" "+d.nganh,nhom:d.nhom,g:d.g,manh:d.manh,anh,z,ox,oy});im.src=cv.toDataURL("image/jpeg",.9)}
  const getBlob=()=>blob?Promise.resolve(blob):new Promise(ok=>cv.toBlob(b=>{blob=b;ok(b)},"image/jpeg",.92));
  function close(){ov.remove();document.body.style.overflow="";busy=0;const q=document.getElementById("qsend");if(q)q.scrollIntoView({behavior:"smooth",block:"center"})}
  ov.querySelector(".tn-x").onclick=close;ov.addEventListener("click",e=>{if(e.target===ov)close()});
  inp.addEventListener("input",()=>{tao.disabled=!ten();if(!s2.hidden){clearTimeout(ttm);ttm=setTimeout(()=>{draw();dien()},350)}});
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&ten())tao.click()});
  tao.onclick=async()=>{if(!ten())return;tao.textContent="Đang tạo thẻ…";await draw();dien();ov.querySelector(".tn-b0").hidden=true;s2.hidden=false;ev("tao-the-nghe-xong","Tạo xong thẻ nghề")};
  const doi=ov.querySelector(".tn-doi");if(doi)doi.onclick=()=>{i=(i+1)%nghe.length;try{sessionStorage.setItem("vcet-tn-"+d.nganh,i)}catch(e){}draw()};
  function tai(b){const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="the-nghe-tuong-lai-vcet.jpg";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000)}
  const fi=ov.querySelector(".tn-file"),zm=ov.querySelector(".tn-zm"),zr=ov.querySelector(".tn-z");
  function nhan(){ov.querySelectorAll(".tn-anh").forEach(b=>b.textContent=anh?"📷 Đổi ảnh khác":(b.closest(".tn-b0")?"📷 Thêm ảnh của em (nếu muốn)":"📷 Thêm ảnh của em"));zm.hidden=!anh;im.classList.toggle("tn-keo",!!anh)}
  ov.querySelectorAll(".tn-anh").forEach(b=>b.onclick=()=>fi.click());
  fi.onchange=async()=>{const f=fi.files&&fi.files[0];fi.value="";if(!f)return;const u=URL.createObjectURL(f),i0=await img(u);URL.revokeObjectURL(u);if(!i0)return;
    const k=Math.min(1,1600/Math.max(i0.width,i0.height)),c=document.createElement("canvas");c.width=Math.round(i0.width*k);c.height=Math.round(i0.height*k);c.getContext("2d").drawImage(i0,0,0,c.width,c.height);
    anh=c;z=1;zr.value=1;ox=0;oy=-.6;nhan();ev("the-nghe-them-anh","Thẻ nghề: thêm ảnh");if(!s2.hidden)draw();else if(ten())tao.click();else inp.focus()};
  let rd=0;const ve2=()=>{if(rd)return;rd=1;setTimeout(async()=>{await draw();rd=0},60)};
  zr.oninput=()=>{z=+zr.value;ve2()};
  let kp=null;im.addEventListener("pointerdown",e=>{if(!anh)return;kp={x:e.clientX,y:e.clientY};try{im.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()});
  im.addEventListener("pointermove",e=>{if(!kp||!anh)return;const k=W/im.clientWidth,dx=(e.clientX-kp.x)*k,dy=(e.clientY-kp.y)*k;kp={x:e.clientX,y:e.clientY};
    if(PM.mx>0)ox=Math.max(-1,Math.min(1,ox-dx/PM.mx));if(PM.my>0)oy=Math.max(-1,Math.min(1,oy-dy/PM.my));ve2()});
  ["pointerup","pointercancel"].forEach(t=>im.addEventListener(t,()=>{kp=null}));
  im.addEventListener("dragstart",e=>e.preventDefault());
  ov.querySelector(".tn-dl").onclick=async()=>{tai(await getBlob());ev("tai-the-nghe","Tải thẻ nghề")};
  ov.querySelector(".tn-share").onclick=async()=>{const b=await getBlob(),f=new File([b],"the-nghe-tuong-lai-vcet.jpg",{type:"image/jpeg"});ev("chia-se-the-nghe","Chia sẻ thẻ nghề");
    const text=ten()+" hợp nghề "+nghe[i]+"! Còn bạn hợp nghề gì? Làm thử 2 phút: "+URL_QR;
    try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text});return}}catch(e){if(e&&e.name==="AbortError")return}
    try{if(navigator.share){await navigator.share({text});return}}catch(e){if(e&&e.name==="AbortError")return}
    tai(b)};
  inp.focus({preventScroll:true})}
return{ve,mo}})();

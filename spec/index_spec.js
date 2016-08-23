String.prototype.toAscii85 = require('../').toAscii85;
String.prototype.fromAscii85 = require('../').fromAscii85;

describe("Ascii85", function() {
  describe("encode", function() {
    it("should encode 4 chars", function() {
      expect("Man ".toAscii85(), "<~9jqo^~>");
    });

    it("should encode with pad", function() {
      expect("somewhat difficult".toAscii85()).toEqual("<~F)Po,GA(E,+Co1uAnbatCif~>");
    });

    it("should encode one letter", function() {
      expect("a".toAscii85()).toEqual("<~@/~>");
    });

    it("should encode one letter", function() {
      expect("easy".toAscii85()).toEqual("<~ARTY*~>");
    });

		it("should encode also zeros", function() {
      expect("bart\u0000\u0000\u0000 simpson".toAscii85()).toEqual("<~@UX;!!!!!AF(oK1F)Pp~>");
    });
  });

  describe("decode", function() {
    it("easy", function() {
      expect('<~ARTY*~>'.fromAscii85(), "easy");
    });

    it("<~F)Po,GA(E,+Co1uAnbatCif~>", function() {
      expect("<~F)Po,GA(E,+Co1uAnbatCif~>".fromAscii85()).toEqual("somewhat difficult");
    });

    it("alphabet", function() {
      expect("<~@:E_WAS,RgBkhF\"D/O92EH6,BF`qtRH$T~>".fromAscii85()).toEqual("abcdefghijklmnopqrstuvwxyz");
    });

  });
});

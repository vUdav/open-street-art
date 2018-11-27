import { expect } from "chai";
import { getMarkerPosition } from "@/plugins/LeafletHelpers";

describe("plugins/LeafletHelpers.js", () => {
  describe("getMarkerPosition", () => {
    it("Функция существует", () => {
      expect(getMarkerPosition).to.be.a("function");
    });

    describe("Возвращает", () => {
      const lat = 60.0;
      const lng = 30.99;
      const result = getMarkerPosition(lat, lng);

      it("Объект", () => {
        expect(result).to.be.a("object");
      });

      it("Верный lat", () => {
        expect(result)
          .to.have.property("lat")
          .with.equal(lat);
      });

      it("Верный lng", () => {
        expect(result)
          .to.have.property("lng")
          .with.equal(lng);
      });
    });
  });
});

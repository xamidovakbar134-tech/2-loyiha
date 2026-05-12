import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          href="/"
          className="d-flex align-items-center gap-3 text-decoration-none text-dark"
        >
          <Image
            src="/image 1.png"
            alt="React Pizza Logo"
            height={38}
            width={38}
          />
          <div>
            <h1 className="h4 fw-bold mb-0 text-uppercase">React Pizza</h1>
            <p className="text-muted mb-0 lh-1" style={{ fontSize: "14px" }}>
              самая вкусная пицца во вселенной
            </p>
          </div>
        </Link>

        <div>
          <button
            className="btn btn-orange d-flex align-items-center gap-3 px-4 py-2"
            style={{
              backgroundColor: "#fe5f1e",
              color: "white",
              borderRadius: "30px",
              fontWeight: "600",
            }}
          >
            <span>520 ₽</span>
            <div
              style={{
                width: "1px",
                height: "20px",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            ></div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-cart3"></i>
              <span>3</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

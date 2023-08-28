import ReactPDF, {
  Document,
  Image,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import {
  Books,
  BorrowIDRequest,
  Customers,
} from "../../service/library-service";
import { Book, Borrow, Customer } from "../../@Typs";
import logo from "../../images/logo.png";

const BorrowPDF = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get librarian", () => BorrowIDRequest(id));
  const borrow: Borrow | undefined = res?.data;
  const { data: resCustomers } = useQuery("get customers", () => Customers());
  const { data: resBooks } = useQuery("get books", () => Books());

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      textAlign: "center",
    },
  });
  if (borrow?.id) {
    return (
      <div className="pdf mt-3 flex justify-center items-center">
        <PDFViewer width="80%" height="100%">
        <Document title={`Borrowing book number ${borrow.id}`}>
            <Page size="A4">
              <View style={styles.page}>
                <View style={styles.section}>
                  <Text>Date: {borrow.borrowingDate.toString()}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text>
                  Book: <br /> <br />
                  {resBooks?.data.find(
                    (book: Book) => book.id === borrow.bookId
                  )
                    ? resBooks.data.find(
                        (book: Book) => book.id === borrow.bookId
                      ).name
                    : " The book has been deleted"}
                </Text>
              </View>

              <View style={styles.section}>
                <Text>
                  Customer: <br /> <br />
                  {resCustomers?.data.find(
                    (customer: Customer) => customer.id === borrow.customerId
                  )
                    ? resCustomers.data.find(
                        (customer: Customer) =>
                          customer.id === borrow.customerId
                      ).firstName +
                      " " +
                      resCustomers.data.find(
                        (customer: Customer) =>
                          customer.id === borrow.customerId
                      ).lastName
                    : "The customer has been deleted"}
                </Text>
              </View>

              <View style={styles.section}>
                <Text>
                  Linrarian: <br /> <br />
                  {borrow.addedByUserName}
                </Text>
              </View>
              
              <View style={styles.section}>
                <Text>
                Return date: <br /> <br />
                  {borrow.returnDate.toString()}
                </Text>
              </View>

              <View style={styles.section}>
                <Text>
                Customer's signature: <br /> <br />
                ________________________
                </Text>
              </View>
              
            </Page>
           
          </Document>
        </PDFViewer>
      </div>
    );
  }
  return <div>No Such Borrow</div>;
};

export default BorrowPDF;

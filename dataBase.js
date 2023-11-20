import mongoose from "mongoose";

const url = "mongodb+srv://sw0583227258:TXfPeaUTNrCJQv02@cluster0.emkfwut.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { tlsAllowInvalidCertificates: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", async function () {
  console.log("Connected to the database!");

  const specSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    status: String, 
  });

  const Spec = mongoose.model("Spec", specSchema);

  // try {
  //   const newSpec = await Spec.create({
  //     id: 1,
  //     title: "Team Spec 1",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae vitae nibh purus non dictum turpis leo, quis nam. Hac sed lectus est id. Nisi vestibulum, placerat integer nam nam. Blandit sagittis.",
  //     date: "2022-11-01",
  //     status: "In progress",
  //   });
  //   console.log("New spec created:", newSpec);
  // } catch (error) {
  //   console.error("Error:", error);
  // }

  // const deleteSpec = await Spec.deleteOne({ id: 1 });
  //   console.log('Deleted spec:', deleteSpec);
  //  } catch (error) {
  //   console.error('Error:', error);
  //  }
});
